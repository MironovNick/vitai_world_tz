'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

// Иконки для кнопки
const BagIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
);

const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const productsData = [
    {
        id: 1,
        name: 'Эфиопия Иргачеффе',
        notes: 'цветочный, бергамот, светлая обжарка',
        weight: '250 г',
        price: '32 BYN',
        bgColor: '#F4EBE1', // Светло-бежевый
        badge: 'Новинка',
        image: '/images/coffee-ethiopia.jpg'
    },
    {
        id: 2,
        name: 'Колумбия Уила',
        notes: 'карамель, красное яблоко',
        weight: '250 г',
        price: '29 BYN',
        bgColor: '#F4EBE1', // Светло-мятный
        badge: null,
        image: '/images/coffee-colombia.jpg'
    },
    {
        id: 3,
        name: 'Бразилия Серрадо',
        notes: 'орех, шоколад, под эспрессо',
        weight: '250 г',
        price: '26 BYN',
        bgColor: '#F4EBE1', // Персиковый
        badge: null,
        image: '/images/coffee-brazil.jpg'
    },
    {
        id: 4,
        name: 'Дрип-пакеты, ассорти',
        notes: '10 штук в упаковке',
        weight: '',
        price: '18 BYN',
        bgColor: '#F4EBE1', // Теплый светло-серый
        badge: 'Хит',
        image: '/images/drip-packets.jpg'
    }
];

export const Products = () => {
    // Состояние для отслеживания, какие товары добавлены (для UX)
    const [addedItems, setAddedItems] = useState<number[]>([]);

    const handleAddToCart = (id: number) => {
        if (!addedItems.includes(id)) {
            setAddedItems([...addedItems, id]);
            // Здесь в будущем будет логика корзины (Redux/Zustand/Context)
        }
    };

    return (
        <StyledProductsSection id="coffee">
            <ProductsContainer>

                <HeaderBlock>
                    <SectionTag>Ассортимент</SectionTag>
                    <Title>Наш кофе</Title>
                    <Description>
                        Мы обжариваем зерно небольшими партиями каждую неделю. Выбирайте кофе под свой вкус и любимый способ приготовления — от эспрессо до воронки.
                    </Description>
                </HeaderBlock>

                <Grid>
                    {productsData.map((product) => {
                        const isAdded = addedItems.includes(product.id);

                        return (
                            <Card key={product.id} $bgColor={product.bgColor}>

                                {/* Обложка карточки */}
                                <CardImageWrapper>
                                    {product.badge && <Badge>{product.badge}</Badge>}
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </CardImageWrapper>

                                {/* Контент карточки */}
                                <CardContent>
                                    <ProductName>{product.name}</ProductName>
                                    <ProductNotes>{product.notes}</ProductNotes>

                                    <Divider />

                                    <BottomRow>
                                        <PriceBlock>
                                            <Price>{product.price}</Price>
                                            {product.weight && <Weight>{product.weight}</Weight>}
                                        </PriceBlock>

                                        <AddToCartButton
                                            onClick={() => handleAddToCart(product.id)}
                                            $isAdded={isAdded}
                                            aria-label={`Добавить ${product.name} в корзину`}
                                        >
                                            {isAdded ? <CheckIcon /> : <BagIcon />}
                                        </AddToCartButton>
                                    </BottomRow>
                                </CardContent>
                            </Card>
                        );
                    })}
                </Grid>

                <BottomCta>
                    <p>Не знаете, что выбрать? Мы поможем определиться.</p>
                    <TextLink href="#contact">Написать нам →</TextLink>
                </BottomCta>

            </ProductsContainer>
        </StyledProductsSection>
    );
};

// --- СТИЛИ (styled-components) ---

const StyledProductsSection = styled.section`
  width: 100%;
  background-color: #1A1A1A; /* Темный фон секции */
  padding: 80px 0;
  
  @media (min-width: 1024px) {
    padding: 120px 0;
  }
`;

const ProductsContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 16px;

  @media (min-width: 1024px) {
    padding: 0 32px;
  }
`;

const HeaderBlock = styled.div`
  max-width: 600px;
  margin-bottom: 48px;
`;

const SectionTag = styled.span`
  color: #C49A6C;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Title = styled.h2`
  color: #FFFFFF;
  font-family: 'Oswald', 'Bebas Neue', sans-serif;
  font-size: 30px;
  font-weight: 500;
  text-transform: uppercase;
  margin: 12px 0 16px 0;

  @media (min-width: 1024px) {
    font-size: 45px;
  }
`;

const Description = styled.p`
  color: #D1D1D1;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  margin: 0;

  @media (min-width: 1024px) {
    font-size: 18px;
  }
`;

/* --- Сетка и Карточки --- */

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Card = styled.div<{ $bgColor: string }>`
  background-color: ${({ $bgColor }) => $bgColor};
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }
`;

const CardImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 240px; /* Высота фото внутри карточки */
  background-color: #E5E0D8; /* Заглушка, пока грузится фото */
  
  img {
    transition: transform 0.5s ease;
  }

  ${Card}:hover & img {
    transform: scale(1.05);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: #2C221E; /* Темный бейдж для контраста на светлом фоне */
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  z-index: 2;
`;

const CardContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ProductName = styled.h3`
  color: #2C221E;
  font-family: 'Oswald', 'Bebas Neue', sans-serif;
  font-size: 22px;
  font-weight: 500;
  margin: 0 0 8px 0;
  text-transform: uppercase;
`;

const ProductNotes = styled.p`
  color: #5A4E48;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(44, 34, 30, 0.1);
  margin: 16px 0;
  width: 100%;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto; /* Прижимает к низу карточки */
`;

const PriceBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const Price = styled.span`
  color: #2C221E;
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 500;
`;

const Weight = styled.span`
  color: #8A7D76;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
`;

const AddToCartButton = styled.button<{ $isAdded: boolean }>`
  background-color: ${({ $isAdded }) => ($isAdded ? '#4CAF50' : '#1A1A1A')};
  color: #FFFFFF;
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $isAdded }) => ($isAdded ? '#43A047' : '#C49A6C')};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

/* --- Нижний блок CTA --- */

const BottomCta = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;

  p {
    color: #D1D1D1;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    margin: 0;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    gap: 16px;
  }
`;

const TextLink = styled.a`
  color: #C49A6C;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #FFFFFF;
  }
`;