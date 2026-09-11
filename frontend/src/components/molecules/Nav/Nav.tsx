import React from 'react';
import * as S from './Nav.styled';

type Props = {
  isOpen?: boolean;
  onNavigate?: () => void;
};

/*
 * Root-relative hrefs, not bare fragments — the header renders on every page,
 * so '#mission' alone would do nothing outside the landing page.
 */
const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#mission' },
  { label: 'Contact', href: 'mailto:dogabudak@gmail.com' },
  { label: 'Donate', href: '/donate' },
];

export const Nav = ({ isOpen = false, onNavigate }: Props) => {
  return (
    <S.NavContainer $isOpen={isOpen} data-testid='header-nav'>
      <S.NavList>
        {LINKS.map(({ label, href }) => (
          <S.NavItem key={label}>
            <S.NavLink href={href} onClick={onNavigate}>
              {label}
            </S.NavLink>
          </S.NavItem>
        ))}
      </S.NavList>
    </S.NavContainer>
  );
};
