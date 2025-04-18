import React from 'react';
import * as S from 'src/components/atoms/Text/Text.styled';

export interface TextProps {
  /** Text content. */
  children: React.ReactNode;
  /** Font Style (default: regular) */
  style?: 'italic' | 'regular';
  /** Font Weight (default: 400) */
  weight?: 400 | 700;
  /** Custom Classname */
  className?: string;
}

/**
 * A basic Text Component
 */
export function Text({
  children,
  style = 'regular',
  weight = 400,
  className,
}: TextProps): JSX.Element {
  return (
    // @ts-ignore
    <S.Text textStyle={style} textWeight={weight} className={className}>
      {children}
    </S.Text>
  );
}
