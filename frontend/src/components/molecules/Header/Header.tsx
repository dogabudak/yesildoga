import React, { useState } from 'react';
import { Turn } from 'hamburger-react';
import { HeaderContainer, HamburgerContainer } from 'src/components/molecules/Header/Header.styled';

/**
 * Header Molecule
 */
export function Header(): JSX.Element {
  const [isOpen, setOpen] = useState(false);

  return (
    <HeaderContainer data-testid='header'>
      <HamburgerContainer onClick={() => setOpen(!isOpen)} data-testid='header-hamburger'>
        <Turn size={24} toggled={isOpen} />
      </HamburgerContainer>
    </HeaderContainer>
  );
}
