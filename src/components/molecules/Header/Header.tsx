import React, { useState } from 'react';
import { Turn } from 'hamburger-react';
import * as S from './Header.styled';

/**
 * Header Molecule
 */
export function Header(): JSX.Element {
  const [isOpen, setOpen] = useState(false);

  return (
    <S.HeaderContainer data-testid='header'>
      <S.HamburgerContainer onClick={() => setOpen(!isOpen)} data-testid='header-hamburger'>
        <Turn size={24} toggled={isOpen} />
      </S.HamburgerContainer>
    </S.HeaderContainer>
  );
}
