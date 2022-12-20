import React from 'react';
import Link from 'next/link';
import * as S from './Anchor.styled';

export interface AnchorProps {
  /** Anchor Text */
  children: string;
  /** Anchor href */
  href: string;
}

/**
 * A simple anchor
 */
export function Anchor({ children, href }: AnchorProps): JSX.Element {
  return (
    <Link href={href} passHref>
      <S.Anchor>{children}</S.Anchor>
    </Link>
  );
}
