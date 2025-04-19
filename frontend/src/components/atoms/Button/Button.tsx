import type { MouseEvent } from 'react';
import React from 'react';
import { Text } from 'src/components/atoms/Text/Text';
import * as S from 'src/components/atoms/Button/Button.styled';

export interface ButtonProps {
  /** Button Text */
  children: React.ReactNode;
  /** Sets to secondary color */
  secondary?: boolean;
  /** onClick Handler */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Type */
  type?: 'submit' | 'button';
}

/**
 * Description of Button.
 */
export function Button({
  children,
  secondary,
  onClick,
  type = 'button',
}: ButtonProps): JSX.Element {
  return (
    <S.Button secondary={secondary} data-testid='button' onClick={onClick} type={type}>
      <Text>{children}</Text>
    </S.Button>
  );
}
