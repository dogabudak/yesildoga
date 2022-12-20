import { untilTablet } from '../../../style/helpers/mixins/mediaQueries';
import styled, { css } from 'styled-components';

type HeaderStyledProps = {
  isOpen: boolean;
};

export const HeaderContainer = styled.div`
  align-items: center;
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  padding: 16px 48px;

  ${untilTablet(css`
    padding: 8px 16px;
  `)}
`;

export const Menu = styled.div<HeaderStyledProps>`
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: relative;

  ${untilTablet(css`
    flex-direction: column;
    max-height: ${({ isOpen }) => (isOpen ? '300px' : '0')};
    overflow: hidden;
    transition: max-height 0.3s ease-in;
    width: 100%;
  `)}
`;

export const LogoContainer = styled.a`
  margin-right: auto;
`;

export const Logo = styled.img`
  height: 48px;
`;

export const MenuLink = styled.div`
  cursor: pointer;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
`;

export const HamburgerContainer = styled.div`
  display: none;
  flex-direction: column;
  margin-right: 16px;

  ${untilTablet(css`
    display: flex;
  `)}
`;
