import type { ButtonProps } from './Button';
import { colors } from '@style/colors';
import { untilTablet } from '@style/helpers/mixins/mediaQueries';
import styled, { css } from 'styled-components';

export const Button = styled.button<ButtonProps>`
  background-color: ${({ secondary }) => (secondary ? colors.secondary : colors.primary)};
  border: none;
  border-radius: 8px;
  color: ${({ secondary }) => (secondary ? 'black' : 'white')};
  outline: none;
  padding: 10px 28px;
  transition: background-color 0.1s ease-in-out;

  ${untilTablet(css`
    padding: 10px 14px;
  `)}
`;
