import React, { useState } from 'react';
import { Turn } from 'hamburger-react';
import {
  HeaderContainer,
  HamburgerContainer,
  Title,
} from 'src/components/molecules/Header/Header.styled';
import { Nav } from 'src/components/molecules/Nav/Nav';

/**
 * Header Molecule
 */
export function Header(): JSX.Element {
  const [isOpen, setOpen] = useState(false);

  return (
    <HeaderContainer data-testid='header'>
      <Title>Yesildoga</Title>
      <Nav />
      <HamburgerContainer onClick={() => setOpen(!isOpen)} data-testid='header-hamburger'>
        <Turn size={24} toggled={isOpen} />
      </HamburgerContainer>
    </HeaderContainer>
  );
}
