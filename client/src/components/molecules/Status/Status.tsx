import React from 'react';
import { Text } from '../../atoms/Text/Text';
import type { Donations } from "../../../types/Donations";
import * as S from './Status.styled';

export interface StatusProps {
  children: React.ReactNode;
  type: Donations
}

/**
 * Description of Status.
 */
export function Status({ type, children }: StatusProps): JSX.Element {
  return (
    <S.Status type={type} data-testid='Status'>
      <Text>{children}</Text>
    </S.Status>
  );
}
