import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Определяем путь к файлу.
// os.tmpdir() — это системная папка для временных файлов (на Windows это C:\Users\...\AppData\Local\Temp)
// Там у нас точно есть права на запись.
const getDbPath = () => path.join(os.tmpdir(), 'kwarta_leads.json');

// Вспомогательная функция для чтения базы
const readDatabase = (): any[] => {
    const dbPath = getDbPath();
    if (!fs.existsSync(dbPath)) {
        // Если файла нет, создаем пустой массив
        fs.writeFileSync(dbPath, JSON.stringify([]), 'utf8');
        return [];
    }
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Ошибка чтения базы:', error);
        return [];
    }
};

// Вспомогательная функция для записи
const writeDatabase = (data: any[]) => {
    const dbPath = getDbPath();
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
};

// Валидация телефона
const isValidBelarusPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    return /^375(25|29|33|44)\d{7}$/.test(digits);
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, interest, comment, utm, pageUrl } = body;

        // 1. Валидация
        if (!name || name.trim().length < 2) {
            return NextResponse.json({ error: 'Пожалуйста, укажите ваше имя' }, { status: 400 } as const);
        }

        if (!isValidBelarusPhone(phone)) {
            return NextResponse.json({ error: 'Введите корректный белорусский номер (+375...)' }, { status: 400 } as const);
        }

        if (!['subscription', 'order', 'question'].includes(interest)) {
            return NextResponse.json({ error: 'Выберите, что вас интересует' }, { status: 400 } as const);
        }

        const cleanPhone = phone.replace(/\D/g, '');

        // 2. Читаем текущую базу
        const leads = readDatabase();

        // 3. Защита от дубликатов (проверяем последние 10 минут)
        const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
        const isDuplicate = leads.some((lead: any) => {
            const leadTime = new Date(lead.created_at).getTime();
            return lead.phone === cleanPhone && leadTime > tenMinutesAgo;
        });

        if (isDuplicate) {
            return NextResponse.json(
                { error: 'Заявка с этого номера уже отправлена. Пожалуйста, подождите 10 минут.' },
                { status: 429 } as const
            );
        }

        // 4. Создаем новую заявку
        const newLead = {
            id: Date.now(), // Используем timestamp как уникальный ID
            name: name.trim(),
            phone: cleanPhone,
            interest,
            comment: comment?.trim() || null,
            utm_source: utm?.source || null,
            utm_campaign: utm?.campaign || null,
            page_url: pageUrl || null,
            created_at: new Date().toISOString(),
        };

        // 5. Сохраняем в файл (добавляем в начало массива, чтобы новые были сверху)
        leads.unshift(newLead);
        writeDatabase(leads);

        // 6. Дублирование в Telegram (если настроено)
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (botToken && chatId) {
            const messageText = `
<b>🔔 Новая заявка с сайта!</b>

<b>Имя:</b> ${newLead.name}
<b>Телефон:</b> ${newLead.phone}
<b>Интерес:</b> ${newLead.interest}
<b>Комментарий:</b> ${newLead.comment || '—'}

<b>Источник:</b> ${newLead.utm_source || 'прямой заход'}
      `;

            try {
                await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: chatId, text: messageText, parse_mode: 'HTML' }),
                });
            } catch (tgError) {
                console.error('Ошибка Telegram:', tgError);
            }
        }

        return NextResponse.json({ success: true, message: 'Заявка успешно отправлена!' });

    } catch (error) {
        console.error('Lead API Error:', error);
        return NextResponse.json(
            { error: 'Произошла ошибка на сервере. Пожалуйста, попробуйте позже.' },
            { status: 500 } as const
        );
    }
}