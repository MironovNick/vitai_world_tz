'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

export const Hero = () => {
    // Функция для плавного скролла к секции с кофе
    const handleScrollToCoffee = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const coffeeSection = document.getElementById('coffee');
        if (coffeeSection) {
            coffeeSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <StyledHeroSection>
            <HeroContainer>
                {/* Текстовая часть */}
                <ContentWrapper>
                    <Subtitle>Мастерская обжарки «Кварта»</Subtitle>
                    <MainTitle>
                        СВЕЖИЙ КОФЕ.<br />
                        ОБЖАРКА ПО ЧЕТВЕРГАМ.
                    </MainTitle>
                    <Description>
                        Мы не храним зерно на складе. Ваш кофе будет обжарен в четверг
                        и привезен к вам в пятницу. Партии по 5 кг с 2019 года.
                    </Description>

                    <ButtonGroup>
                        <PrimaryButton href="#coffee" onClick={handleScrollToCoffee}>
                            ВЫБРАТЬ КОФЕ
                        </PrimaryButton>
                        <SecondaryLink href="#subscription">
                            Оформить подписку →
                        </SecondaryLink>
                    </ButtonGroup>
                </ContentWrapper>

                {/* Визуальная часть с фото */}
                <ImageWrapper>
                    {/* Замените '/images/hero-baristas.jpg' на путь к вашему загруженному фото в папке public */}
                    <Image
                        src="/images/hero-baristas.jpg"
                        alt="Аня и Дмитрий готовят кофе в мастерской Кварта"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        style={{ objectFit: 'cover' }}
                    />
                    <ImageOverlay />
                </ImageWrapper>
            </HeroContainer>
        </StyledHeroSection>
    );
};

// --- СТИЛИ (styled-components) ---

const StyledHeroSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh; /* Занимает весь экран */
  background-color: #1A1A1A;
  display: flex;
  align-items: center;
  padding-top: 72px; /* Отступ под фиксированный header */
  overflow: hidden;

  @media (min-width: 1024px) {
    min-height: 85vh;
  }
`;

const HeroContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 32px 16px;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    padding: 0 32px;
    gap: 48px;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 32px;

  @media (min-width: 1024px) {
    padding-bottom: 0;
    max-width: 600px;
  }
`;

const Subtitle = styled.span`
  display: inline-block;
  color: #C49A6C; /* Акцентный цвет */
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 16px;
`;

const MainTitle = styled.h1`
  color: #FFFFFF;
  font-family: 'Oswald', 'Bebas Neue', sans-serif;
  font-size: 30px;
  font-weight: 500;
  line-height: 1.1;
  text-transform: uppercase;
  margin: 0 0 24px 0;
  letter-spacing: 1px;

  @media (min-width: 768px) {
    font-size: 30px;
  }

  @media (min-width: 1024px) {
    font-size: 45px;
  }
`;

const Description = styled.p`
  color: #D1D1D1;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 32px 0;
  max-width: 480px;

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;

  @media (min-width: 480px) {
    flex-direction: row;
    align-items: center;
    gap: 24px;
  }
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: #C49A6C;
  color: #1A1A1A;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 700;
  padding: 16px 32px;
  border-radius: 30px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s ease-in-out;
  width: 100%;

  &:hover {
    background-color: #b88e62;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(196, 154, 108, 0.3);
  }

  @media (min-width: 480px) {
    width: auto;
  }
`;

const SecondaryLink = styled.a`
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
  padding: 8px 0;

  &:hover {
    color: #C49A6C;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
  height: 400px; /* Высота для мобильных */
  border-radius: 8px;
  overflow: hidden;
  z-index: 1;

  @media (min-width: 1024px) {
    height: 700px; /* Высота для десктопа */
    max-width: 50%;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Легкий градиент, чтобы сгладить переход и сделать фото чуть темнее */
  background: linear-gradient(to right, rgba(26,26,26,0.4) 0%, rgba(26,26,26,0) 100%);
  pointer-events: none;

  @media (max-width: 1023px) {
    background: linear-gradient(to top, rgba(26,26,26,0.8) 0%, rgba(26,26,26,0) 100%);
  }
`;