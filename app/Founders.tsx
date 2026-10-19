'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

export const Founders = () => {
    return (
        <StyledFoundersSection id="about">
            <FoundersContainer>

                {/* Левая колонка: Фото обжарки */}
                <ImageColumn>
                    <ImageWrapper>
                        {/* Замените '/images/roasting-process.jpg' на путь к вашему фото в папке public */}
                        <Image
                            src="/images/roasting-process.jpg"
                            alt="Процесс обжарки кофе в мастерской Кварта"
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            style={{ objectFit: 'cover' }}
                        />
                    </ImageWrapper>
                    {/* Декоративный элемент, отсылающий к крафту */}
                    <Badge>жарим кофе с 2019 года</Badge>
                </ImageColumn>

                {/* Правая колонка: Текст */}
                <TextColumn>
                    <SectionTag>Кто мы</SectionTag>
                    <Title>Аня, Дмитрий и запах свежего кофе</Title>

                    <Paragraph>
                        Мы — Аня и Дмитрий, работаем для вас
                        с 2019 года.<br/>
                        Мы любим своё дело и точно знаем:
                        самый вкусный кофе — свежеобжаренный.
                    </Paragraph>

                    <Paragraph>
                        Свежесть — для нас не только маркетинг. Мы любим свой кофе и делимся им с вами.
                        В первые несколько дней после обжарки
                        зерно раскрывает свои лучшие вкусы: яркую кислинку, сладость и
                        аромат. Через месяц эти ноты выдыхаются, поэтому мы не привыкли держать свой кофе на полке.
                        Мы обжариваем зёрна в четверг, а уже в пятницу привозим их вам,
                        чтобы вы пили кофе на пике вкуса, а не с тем, что от него осталось.
                    </Paragraph>

                    <Divider />

                    {/* Мини-факты для доверия */}
                    <FactsGrid>
                        <FactItem>
                            <FactValue>5 кг</FactValue>
                            <FactLabel>Объем партии</FactLabel>
                        </FactItem>
                        <FactItem>
                            <FactValue>1–3 дня</FactValue>
                            <FactLabel>От ростера до вас</FactLabel>
                        </FactItem>
                        <FactItem>
                            <FactValue>100%</FactValue>
                            <FactLabel>Контроль обжарки</FactLabel>
                        </FactItem>
                    </FactsGrid>
                </TextColumn>

            </FoundersContainer>
        </StyledFoundersSection>
    );
};

// --- СТИЛИ (styled-components) ---

const StyledFoundersSection = styled.section`
  width: 100%;
  background-color: #FFFFFF;
  padding: 80px 0;
  overflow: hidden;

  @media (min-width: 1024px) {
    padding: 120px 0;
  }
`;

const FoundersContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 48px;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    padding: 0 32px;
    gap: 80px;
  }
`;

/* --- Стили левой колонки (Фото) --- */

const ImageColumn = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  height: 400px;

  @media (min-width: 768px) {
    height: 500px;
  }

  @media (min-width: 1024px) {
    height: 650px;
    max-width: 50%;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  /* Легкая тень для объема */
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  
  img {
    transition: transform 0.6s ease;
  }

  &:hover img {
    transform: scale(1.03); /* Легкий зум при наведении */
  }
`;

const Badge = styled.div`
  position: absolute;
  bottom: -16px;
  right: 24px;
  background-color: #C49A6C;
  color: #1A1A1A;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 700;
  padding: 12px 24px;
  border-radius: 4px;
  box-shadow: 0 8px 16px rgba(196, 154, 108, 0.3);
  transform: rotate(-2deg); /* Легкий наклон для живости */
  z-index: 2;

  @media (min-width: 1024px) {
    bottom: 32px;
    right: -24px;
    font-size: 16px;
  }
`;

/* --- Стили правой колонки (Текст) --- */

const TextColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 1024px) {
    max-width: 50%;
  }
`;

const SectionTag = styled.span`
  color: #C49A6C;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  color: #2C221E; /* Темно-коричневый вместо черного */
  font-family: 'Oswald', 'Bebas Neue', sans-serif;
  font-size: 30px;
  font-weight: 500;
  line-height: 1.1;
  margin: 0 0 24px 0;
  text-transform: uppercase;

  @media (min-width: 1024px) {
    font-size: 45px;
  }
`;

const Paragraph = styled.p`
  color: #4A3F3A;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 20px 0;

  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #E5E0D8;
  margin: 32px 0;
`;

/* --- Сетка фактов --- */

const FactsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const FactItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FactValue = styled.span`
  color: #C49A6C;
  font-family: 'Oswald', 'Bebas Neue', sans-serif;
  font-size: 24px;
  font-weight: 700;

  @media (min-width: 1024px) {
    font-size: 32px;
  }
`;

const FactLabel = styled.span`
  color: #7A706B;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (min-width: 1024px) {
    font-size: 14px;
  }
`;