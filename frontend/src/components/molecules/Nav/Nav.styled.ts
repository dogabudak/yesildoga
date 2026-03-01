import styled from 'styled-components';
import { untilTablet } from 'src/style/helpers/mixins/mediaQueries';
import type { AnchorHTMLAttributes } from 'react';

export const NavContainer = styled.nav`
  margin-left: auto;

  ${untilTablet`
    display: none;
  `}
`;

export const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const NavItem = styled.li`
  margin-left: 2rem;
`;

export const NavLink = styled.a<AnchorHTMLAttributes<HTMLAnchorElement>>`
  color: #333;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #0c9346;
  }
`;
