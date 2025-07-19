import { untilTablet } from 'src/style/helpers/mixins/mediaQueries';
import styled, { css } from 'styled-components';
import { HTMLAttributes } from 'react';

export const HeaderContainer = styled.div<HTMLAttributes<HTMLDivElement>>`
  align-items: center;
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  padding: 16px 48px;

  ${untilTablet(css`
    padding: 8px 16px;
  `)}
`;

export const HamburgerContainer = styled.div<HTMLAttributes<HTMLDivElement>>`
  display: none;
  flex-direction: column;
  margin-right: 16px;

  ${untilTablet(css`
    display: flex;
  `)}
`;
