import React from 'react';
import { Text } from 'src/components/atoms/Text/Text';
import * as S from 'src/components/atoms/ImageBadge/ImageBadge.styled';

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
