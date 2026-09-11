import styled, { css } from 'styled-components';
import { untilTablet } from 'src/style/helpers/mixins/mediaQueries';
import type { AnchorHTMLAttributes } from 'react';

export const NavContainer = styled.nav<{ $isOpen: boolean }>`
  margin-left: auto;

  /*
   * Below the tablet breakpoint the nav becomes a drawer under the header
   * rather than disappearing — the hamburger is the only way to reach it.
   */
  ${({ $isOpen }) =>
    untilTablet(css`
      background: #fff;
      border-top: 1px solid #e5e5e5;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
      display: ${$isOpen ? 'block' : 'none'};
      inset-block-start: 100%;
      inset-inline: 0;
      margin-inline-start: 0;
      position: absolute;
      z-index: 20;
    `)}
`;

export const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  ${untilTablet(css`
    flex-direction: column;
  `)}
`;

export const NavItem = styled.li`
  margin-left: 2rem;

  ${untilTablet(css`
    margin-inline-start: 0;

    & + & {
      border-block-start: 1px solid #f0f0f0;
    }
  `)}
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

  ${untilTablet(css`
    display: block;
    padding: 14px 16px;
  `)}
`;
