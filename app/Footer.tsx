'use client';

import React from 'react';
import styled from 'styled-components';

// --- Иконки (inline SVG) ---

const PhoneIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
);

const TelegramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);

const InstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const MapPinIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

export const Footer = () => {
    return (
        <StyledFooter>
            <FooterContainer>

                {/* Верхняя часть футера: Контакты и Карта */}
                <TopSection>

                    <InfoColumn>


                        <ContactList>
                            {/* Телефон */}
                            <ContactItem>

                                <div>
                                    <Label>Позвонить</Label>
                                    <a href="tel:+375291234567">+375 (29) 123-45-67</a>
                                </div>
                            </ContactItem>

                            {/* Telegram */}
                            <ContactItem>

                                <div>
                                    <Label>Написать в Telegram</Label>
                                    <a href="https://t.me/kwarta_coffee" target="_blank" rel="noopener noreferrer">@kwarta_coffee</a>
                                </div>
                            </ContactItem>

                            {/* Instagram */}
                            <ContactItem>

                                <div>
                                    <Label>Следить за обжаркой в Instagram</Label>
                                    <a href="https://instagram.com/kwarta_coffee" target="_blank" rel="noopener noreferrer">@kwarta_coffee</a>
                                </div>
                            </ContactItem>

                            {/* Адрес */}
                            <ContactItem>

                                <div>
                                    <Label>Самовывоз</Label>
                                    <p>Минск, ул. Короля, 9</p>
                                    <SmallText>Пн-Пт 8:00-20:00, Сб-Вс 10:00-18:00</SmallText>
                                </div>
                            </ContactItem>
                        </ContactList>
                    </InfoColumn>

                    {/* Карта и кнопка "Как нас найти" */}
                    <MapColumn>
                        <MapWrapper>
                            {/* В реальном проекте замените src на ссылку-встраивание вашей организации из Google Maps */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.4228402039!2d27.55858431578935!3d53.90231988009654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbcfc4b6b7a9a3%3A0x6b7a9a3c4b6b7a9a!2z0YPQuy4g0JrQvtGA0L7Qu9GPLCA5LCDQnNC40L3RgdC6!5e0!3m2!1sru!2sby!4v1620000000000!5m2!1sru!2sby"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Карта: Минск, ул. Короля, 9"
                            />
                        </MapWrapper>

                        <MapButton
                            href="https://maps.google.com/?q=Минск,+ул.+Короля,+9"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Как нас найти (Открыть в Google Maps)
                        </MapButton>
                    </MapColumn>

                </TopSection>

                {/* Нижняя часть футера: Юридическая информация и мелкие ссылки */}
                <BottomSection>
                    <Copyright>
                        © 2025 Мастерская обжарки «Кварта». <br />
                        ИП Иванова А.А. УНП 123456789.
                    </Copyright>

                    <LegalLinks>
                        <a href="/privacy">Политика конфиденциальности</a>
                        <a href="/terms">Пользовательское соглашение</a>
                    </LegalLinks>
                </BottomSection>

            </FooterContainer>
        </StyledFooter>
    );
};

// --- СТИЛИ (styled-components) ---

const StyledFooter = styled.footer`
  width: 100%;
  background-color: #111111; /* Темнее, чем основной фон для контраста */
  color: #FFFFFF;
  padding: 64px 0 32px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const FooterContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 48px;

  @media (min-width: 1024px) {
    padding: 0 32px;
  }
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 64px;
  }
`;

const InfoColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const LogoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LogoText = styled.span`
  font-family: 'Oswald', 'Bebas Neue', sans-serif;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #FFFFFF;
`;

const Slogan = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #A09A96;
  margin: 0;
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;

  a, p {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    color: #FFFFFF;
    text-decoration: none;
    margin: 0;
    transition: color 0.2s ease;
  }

  a:hover {
    color: #C49A6C;
  }
`;

const IconWrapper = styled.div`
  color: #C49A6C;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
`;

const Label = styled.span`
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #8A7D76;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
`;

const SmallText = styled.span`
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #8A7D76;
  margin-top: 4px;
`;

const MapColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #1A1A1A;
  /* Легкий фильтр, чтобы карта не выбивалась из темного дизайна */
  filter: grayscale(0.8) contrast(1.2);
  transition: filter 0.3s ease;

  &:hover {
    filter: grayscale(0) contrast(1);
  }

  @media (min-width: 1024px) {
    height: 300px;
  }
`;

const MapButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  background-color: transparent;
  border: 1px solid #C49A6C;
  color: #C49A6C;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  border-radius: 30px;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: #C49A6C;
    color: #1A1A1A;
  }
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Copyright = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #7A706B;
  line-height: 1.5;
`;

const LegalLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  a {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: #7A706B;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  a:hover {
    color: #FFFFFF;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 24px;
  }
`;