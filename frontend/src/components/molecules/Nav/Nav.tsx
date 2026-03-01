import React from 'react';
import * as S from './Nav.styled';

export const Nav = () => {
  return (
    <S.NavContainer>
      <S.NavList>
        <S.NavItem>
          <S.NavLink href='#'>Home</S.NavLink>
        </S.NavItem>
        <S.NavItem>
          <S.NavLink href='#'>About</S.NavLink>
        </S.NavItem>
        <S.NavItem>
          <S.NavLink href='#'>Contact</S.NavLink>
        </S.NavItem>
      </S.NavList>
    </S.NavContainer>
  );
};
