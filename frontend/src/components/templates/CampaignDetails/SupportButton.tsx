import React from 'react';
import Link from 'next/link';
import * as S from './SupportButton.styled';

interface SupportButtonProps {
  slug: string;
  accentColor: string;
}

export const SupportButton: React.FC<SupportButtonProps> = ({ slug, accentColor }) => (
  <Link href={`/donate?campaign=${slug}`} passHref legacyBehavior>
    <S.ButtonLink accentColor={accentColor}>
      Support This Campaign
    </S.ButtonLink>
  </Link>
);
