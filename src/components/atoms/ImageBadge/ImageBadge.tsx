import React from 'react';
import { Text } from '@atoms/Text/Text';
import * as S from './ImageBadge.styled';

export interface ImageBadgeProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Description of ImageBadge.
 */
export function ImageBadge({ children, className }: ImageBadgeProps): JSX.Element {
  return (
    // @ts-ignore
    <S.ImageBadge className={className} data-testid='imagebadge'>
      <Text>{children}</Text>
    </S.ImageBadge>
  );
}
