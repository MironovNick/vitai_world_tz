'use client';

import React from 'react';
import styled from 'styled-components';

export const Subscribe = () => {
    return (
        <StyledSubscriptionSection id="subscription">
            {/* Видео-фон */}
            <VideoBackground
                autoPlay
                loop
                muted
                playsInline
                poster="/images/subscribe-poster.jpg" // Заглушка, пока видео грузится
            >
                <source src="/videos/subscribe-bg.mp4" type="video/mp4" />
            </VideoBackground>

            {/* Затемняющий оверлей, чтобы текст читался */}
            <Overlay />

            <ContentContainer>
                <Title>Подписка</Title>

                <Description>
                    2 пачки по 250 г раз в месяц<br />
                    Доставка бесплатно
                </Description>

                <PriceBlock>
                    <Price>54 BYN</Price>
                    <Period>/ мес</Period>
                </PriceBlock>

                <SubscribeButton href="#contact">
                    Подписаться
                </SubscribeButton>
            </ContentContainer>
        </StyledSubscriptionSection>
    );
};

// --- СТИЛИ (styled-components) ---

const StyledSubscriptionSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 70vh; /* Высота блока */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #1A1A1A;

  @media (min-width: 1024px) {
    min-height: 80vh;
  }
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  object-fit: cover;
  z-index: 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Двойной градиент: сверху и снизу, чтобы текст по центру читался лучше */
  background: linear-gradient(
    180deg, 
    rgba(26, 26, 26, 0.6) 0%, 
    rgba(26, 26, 26, 0.3) 50%, 
    rgba(26, 26, 26, 0.7) 100%
  );
  z-index: 1;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 16px;
  max-width: 600px;
`;

const Title = styled.h2`
  color: #FFFFFF;
  font-family: 'Oswald', 'Bebas Neue', sans-serif;
  font-size: 48px;
  font-weight: 500;
  text-transform: uppercase;
  margin: 0 0 16px 0;
  letter-spacing: 1px;

  @media (min-width: 1024px) {
    font-size: 72px; /* Крупный заголовок как на скриншоте */
  }
`;

const Description = styled.p`
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  margin: 0 0 24px 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5); /* Тень для читаемости на видео */

  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

const PriceBlock = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 32px;
`;

const Price = styled.span`
  color: #C49A6C; /* Наш акцентный цвет */
  font-family: 'Oswald', 'Bebas Neue', sans-serif;
  font-size: 36px;
  font-weight: 500;

  @media (min-width: 1024px) {
    font-size: 48px;
  }
`;

const Period = styled.span`
  color: #D1D1D1;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
`;

const SubscribeButton = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 1px solid #ffffff;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  padding: 16px 48px;
  border-radius: 30px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #F4EBE1; /* Слегка уходит в наш бежевый при наведении */
    color: #0a0a0a;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;