'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Типы для UTM
type UTMData = {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
    term?: string;
};

export const LeadForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        interest: 'order', // по умолчанию
        comment: '',
    });

    const [utm, setUtm] = useState<UTMData>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [serverError, setServerError] = useState('');

    // Сбор UTM-меток при загрузке
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const currentUtm = {
            source: params.get('utm_source') || undefined,
            medium: params.get('utm_medium') || undefined,
            campaign: params.get('utm_campaign') || undefined,
            content: params.get('utm_content') || undefined,
            term: params.get('utm_term') || undefined,
        };

        // Сохраняем в localStorage, чтобы не потерять, если человек обновит страницу
        if (Object.values(currentUtm).some(val => val !== undefined)) {
            localStorage.setItem('kwarta_utm', JSON.stringify(currentUtm));
            setUtm(currentUtm);
        } else {
            const savedUtm = localStorage.getItem('kwarta_utm');
            if (savedUtm) setUtm(JSON.parse(savedUtm));
        }
    }, []);

    // Маска для телефона
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (!value.startsWith('375')) {
            value = '375' + value;
        }
        value = value.substring(0, 12); // 375 + 9 цифр

        let formatted = '+375 ';
        if (value.length > 3) formatted += value.substring(3, 5);
        if (value.length > 5) formatted += ' ' + value.substring(5, 8);
        if (value.length > 8) formatted += '-' + value.substring(8, 10);
        if (value.length > 10) formatted += '-' + value.substring(10, 12);

        setFormData({ ...formData, phone: formatted });
        if (errors.phone) setErrors({ ...errors, phone: '' });
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (formData.name.trim().length < 2) newErrors.name = 'Укажите ваше имя';

        const digits = formData.phone.replace(/\D/g, '');
        if (!/^375(25|29|33|44)\d{7}$/.test(digits)) {
            newErrors.phone = 'Введите корректный номер (+375 29 XXX-XX-XX)';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status === 'loading' || status === 'success') return; // Защита от двойного клика
        if (!validate()) return;

        setStatus('loading');
        setServerError('');

        try {
            const response = await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    utm,
                    pageUrl: window.location.href,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Что-то пошло не так');
            }

            setStatus('success');
            setFormData({ name: '', phone: '', interest: 'order', comment: '' });
        } catch (err: any) {
            setStatus('error');
            setServerError(err.message);
        }
    };

    return (
        <StyledSection id="contact">
            <Container>
                <FormWrapper>
                    <TextContent>
                        <Title>Оставьте заявку</Title>
                        <Description>
                            Свяжемся с вами в течение 15 минут, чтобы помочь с выбором кофе и обсудить доставку.
                        </Description>
                    </TextContent>

                    {status === 'success' ? (
                        <SuccessMessage>
                            <h3>Спасибо! Заявка принята.</h3>
                            <p>Мы скоро свяжемся с вами. А пока можете посмотреть наш <a href="#coffee">ассортимент</a>.</p>
                        </SuccessMessage>
                    ) : (
                        <Form onSubmit={handleSubmit} noValidate>
                            {/* Поле: Имя */}
                            <FieldGroup>
                                <Label htmlFor="name">Ваше имя</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Имя"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    $hasError={!!errors.name}
                                />
                                {errors.name && <ErrorText>{errors.name}</ErrorText>}
                            </FieldGroup>

                            {/* Поле: Телефон */}
                            <FieldGroup>
                                <Label htmlFor="phone">Телефон</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+375 29 123-45-67"
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    $hasError={!!errors.phone}
                                />
                                {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
                            </FieldGroup>

                            {/* Поле: Интерес */}
                            <FieldGroup>
                                <Label>Что вас интересует?</Label>
                                <RadioGroup>
                                    <RadioLabel>
                                        <input type="radio" name="interest" value="order" checked={formData.interest === 'order'} onChange={(e) => setFormData({ ...formData, interest: e.target.value })} />
                                        Разовый заказ
                                    </RadioLabel>
                                    <RadioLabel>
                                        <input type="radio" name="interest" value="subscription" checked={formData.interest === 'subscription'} onChange={(e) => setFormData({ ...formData, interest: e.target.value })} />
                                        Подписка
                                    </RadioLabel>
                                    <RadioLabel>
                                        <input type="radio" name="interest" value="question" checked={formData.interest === 'question'} onChange={(e) => setFormData({ ...formData, interest: e.target.value })} />
                                        Вопрос
                                    </RadioLabel>
                                </RadioGroup>
                            </FieldGroup>

                            {/* Поле: Комментарий */}
                            <FieldGroup>
                                <Label htmlFor="comment">Комментарий (необязательно)</Label>
                                <TextArea
                                    id="comment"
                                    rows={3}
                                    placeholder="Например: нужен кофе для воронки, средняя обжарка"
                                    value={formData.comment}
                                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                />
                            </FieldGroup>

                            {serverError && <ServerErrorText>{serverError}</ServerErrorText>}

                            <SubmitButton type="submit" disabled={status === 'loading'}>
                                {status === 'loading' ? 'Отправка...' : 'Жду звонка'}
                            </SubmitButton>

                            <Agreement>
                                Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                            </Agreement>
                        </Form>
                    )}
                </FormWrapper>
            </Container>
        </StyledSection>
    );
};

// --- СТИЛИ (styled-components) ---

const StyledSection = styled.section`
  width: 100%;
  background-color: #1A1A1A;
  padding: 80px 0;
  @media (min-width: 1024px) { padding: 120px 0; }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

const FormWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background-color: #FFFFFF;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  @media (min-width: 768px) { padding: 48px; }
`;

const TextContent = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const Title = styled.h2`
  color: #2C221E;
  font-family: 'Oswald', 'Bebas Neue', sans-serif;
  font-size: 28px;
  text-transform: uppercase;
  margin: 0 0 12px 0;
  @media (min-width: 768px) { font-size: 36px; }
`;

const Description = styled.p`
  color: #5A4E48;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  line-height: 1.5;
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #2C221E;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
`;

const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  background-color: #F9F9F9;
  border: 1px solid ${({ $hasError }) => $hasError ? '#D32F2F' : '#E0E0E0'};
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #2C221E;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #C49A6C;
    box-shadow: 0 0 0 3px rgba(196, 154, 108, 0.2);
  }
  
  &::placeholder { color: #A09A96; }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  background-color: #F9F9F9;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #2C221E;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #C49A6C;
    box-shadow: 0 0 0 3px rgba(196, 154, 108, 0.2);
  }
  &::placeholder { color: #A09A96; }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 4px 0;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: #2C221E;
  cursor: pointer;

  input[type="radio"] {
    accent-color: #C49A6C;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const ErrorText = styled.span`
  color: #D32F2F;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
`;

const ServerErrorText = styled(ErrorText)`
  text-align: center;
  padding: 12px;
  background-color: #FFEBEE;
  border-radius: 8px;
  font-weight: 500;
`;

const SubmitButton = styled.button`
  height: 52px;
  background-color: #C49A6C;
  color: #1A1A1A;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 700;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.2s ease;
  margin-top: 8px;

  &:hover:not(:disabled) { background-color: #b88e62; transform: translateY(-1px); }
  &:active:not(:disabled) { transform: translateY(0); }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const Agreement = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #8A7D76;
  text-align: center;
  margin: 0;
  line-height: 1.4;
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 40px 0;
  
  h3 {
    color: #2C221E;
    font-family: 'Oswald', 'Bebas Neue', sans-serif;
    font-size: 24px;
    margin-bottom: 12px;
  }
  p {
    color: #5A4E48;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
  }
  a {
    color: #C49A6C;
    font-weight: 600;
    text-decoration: none;
  }
`;