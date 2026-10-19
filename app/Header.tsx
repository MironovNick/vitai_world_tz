'use client';

import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

// Иконки в формате inline SVG для независимости от внешних библиотек
const LogoIcon = () => (
    <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Чашка */}
        <path
            d="M5 9C5 9 4.5 14.5 6 17C7 18.5 9 19 12 19C15 19 17 18.5 18 17C19.5 14.5 19 9 19 9H5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />

        {/* Ручка */}
        <path
            d="M19 10H20.5C21.3284 10 22 10.6716 22 11.5V12.5C22 13.3284 21.3284 14 20.5 14H19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />

        {/* Блюдце */}
        <path
            d="M3 21C3 21 5 23 12 23C19 23 21 21 21 21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />

        {/* Пар (левая волна) */}
        <path
            d="M9 6C9 5 10 4 9 2.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />

        {/* Пар (правая волна) */}
        <path
            d="M12 6C12 4.5 13.5 3.5 12 1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const SearchIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const CartIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
);

const MenuIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Логика изменения фона/тени при скролле
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <StyledHeader $isScrolled={isScrolled}>
            <HeaderContainer>
                {/* Логотип */}
                <LogoLink href="/">
                    <LogoIcon />
                    <LogoText>Кварта</LogoText>
                </LogoLink>

                {/* Десктопная навигация */}
                <DesktopNav>
                    <NavLink href="#coffee">Кофе</NavLink>
                    <NavLink href="#subscription">Подписка</NavLink>
                    <NavLink href="#about">О нас</NavLink>
                    <NavLink href="#delivery">Доставка</NavLink>
                </DesktopNav>

                {/* Действия (Поиск, Корзина, Кнопка) */}
                <ActionsGroup>
                    <IconButton aria-label="Поиск">
                        <SearchIcon />
                    </IconButton>

                    <CartWrapper>
                        <IconButton aria-label="Корзина">
                            <CartIcon />
                        </IconButton>
                        <CartBadge>0</CartBadge>
                    </CartWrapper>

                    <BuyButton href="#coffee">Купить кофе</BuyButton>

                    {/* Бургер для мобильных */}
                    <MobileMenuButton
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Меню"
                    >
                        <MenuIcon />
                    </MobileMenuButton>
                </ActionsGroup>
            </HeaderContainer>

            {/* Мобильное меню (упрощенная версия для прототипа) */}
            <MobileMenu $isOpen={isMobileMenuOpen}>
                <MobileNavLink href="#coffee">Кофе</MobileNavLink>
                <MobileNavLink href="#subscription">Подписка</MobileNavLink>
                <MobileNavLink href="#about">О нас</MobileNavLink>
                <MobileNavLink href="#delivery">Доставка</MobileNavLink>
            </MobileMenu>
        </StyledHeader>
    );
};

// --- СТИЛИ (styled-components) ---

const StyledHeader = styled.header<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 72px;
  background-color: #1A1A1A;
  color: #FFFFFF;
  z-index: 1000;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  ${({ $isScrolled }) => $isScrolled && css`
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    background-color: rgba(26, 26, 26, 0.95); /* Легкая прозрачность при скролле */
    backdrop-filter: blur(8px);
  `}
`;

const HeaderContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  height: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) {
    padding: 0 32px;
  }
`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #FFFFFF;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const LogoText = styled.span`
  font-family: 'Inter', sans-serif; /* Узкий гротеск, как на референсах */
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
`;

const DesktopNav = styled.nav`
  display: none;
  align-items: center;
  gap: 32px;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

const NavLink = styled.a`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #D1D1D1;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color 0.2s ease;

  &:hover {
    color: #C49A6C; /* Акцентный цвет */
  }
`;

const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (min-width: 1024px) {
    gap: 24px;
  }
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: #FFFFFF;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  transition: color 0.2s ease;

  &:hover {
    color: #C49A6C;
  }

  @media (max-width: 1023px) {
    display: none; /* Скрываем поиск и корзину на мобильных, чтобы не перегружать */
  }
`;

const CartWrapper = styled.div`
  position: relative;
  display: none;

  @media (min-width: 1024px) {
    display: block;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #C49A6C;
  color: #1A1A1A;
  font-size: 10px;
  font-weight: 700;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(50%, -50%);
`;

const BuyButton = styled.a`
  display: none;
  background-color: #C49A6C;
  color: white;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 700;
  padding: 10px 10px;
  border-radius: 30px;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: #b88e62;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (min-width: 1024px) {
    display: block;
  }
`;

const MobileMenuButton = styled.button`
  background: transparent;
  border: none;
  color: #FFFFFF;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 1024px) {
    display: none;
  }
`;

/* Мобильное меню (выпадающее) */
const MobileMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 72px;
  left: 0;
  width: 100%;
  background-color: #1A1A1A;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease-in-out;
  transform: translateY($({ $isOpen }) => ($isOpen ? '0' : '-100%'));
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  z-index: 999;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const MobileNavLink = styled.a`
  color: #FFFFFF;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:hover {
    color: #C49A6C;
  }
`;