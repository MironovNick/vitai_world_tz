import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

// Инициализация БД (создастся файл leads.db в корне проекта)
const dbPath = path.resolve(process.cwd(), 'leads.db');
const db = new Database(dbPath);

// Создаем таблицу при первом запуске
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    interest TEXT NOT NULL,
    comment TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    utm_term TEXT,
    page_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE INDEX IF NOT EXISTS idx_phone_time ON leads(phone, created_at);
`);

// Функция валидации белорусского номера (формат +375 XX XXX-XX-XX)
const isValidBelarusPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    return /^375(25|29|33|44)\d{7}$/.test(digits);
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, interest, comment, utm, pageUrl } = body;

        // 1. Валидация полей
        if (!name || name.trim().length < 2) {
            return NextResponse.json(
                { error: 'Пожалуйста, укажите ваше имя' },
                { status: 400 } as const
            );
        }

        if (!isValidBelarusPhone(phone)) {
            return NextResponse.json(
                { error: 'Введите корректный белорусский номер (+375...)' },
                { status: 400 } as const
            );
        }

        if (!['subscription', 'order', 'question'].includes(interest)) {
            return NextResponse.json(
                { error: 'Выберите, что вас интересует' },
                { status: 400 } as const
            );
        }

        // Очищаем телефон для сохранения в едином формате
        const cleanPhone = phone.replace(/\D/g, '');

        // 2. Защита от дубликатов (один номер не чаще раза в 10 минут)
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
        const recentLead = db.prepare(
            'SELECT id FROM leads WHERE phone = ? AND created_at > ?'
        ).get(cleanPhone, tenMinutesAgo);

        if (recentLead) {
            return NextResponse.json(
                { error: 'Заявка с этого номера уже отправлена. Пожалуйста, подождите 10 минут.' },
                { status: 429 } as const
            );
        }

        // 3. Сохранение в БД
        const insert = db.prepare(`
      INSERT INTO leads (name, phone, interest, comment, utm_source, utm_medium, utm_campaign, utm_content, utm_term, page_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

        insert.run(
            name.trim(),
            cleanPhone,
            interest,
            comment?.trim() || null,
            utm?.source || null,
            utm?.medium || null,
            utm?.campaign || null,
            utm?.content || null,
            utm?.term || null,
            pageUrl || null
        );

        // В реальном проекте здесь можно добавить отправку в Telegram-бот менеджера

        return NextResponse.json({ success: true, message: 'Заявка успешно отправлена!' });

    } catch (error) {
        console.error('Lead API Error:', error);
        return NextResponse.json(
            { error: 'Произошла ошибка на сервере. Пожалуйста, попробуйте позже или позвоните нам.' },
            { status: 500 } as const
        );
    }
}