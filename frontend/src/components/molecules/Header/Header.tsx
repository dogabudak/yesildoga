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
      <Nav isOpen={isOpen} onNavigate={() => setOpen(false)} />
      <HamburgerContainer
        onClick={() => setOpen(!isOpen)}
        data-testid='header-hamburger'
        role='button'
        aria-label='Toggle navigation menu'
        aria-expanded={isOpen}
      >
        <Turn size={24} toggled={isOpen} />
      </HamburgerContainer>
    </HeaderContainer>
  );
}
