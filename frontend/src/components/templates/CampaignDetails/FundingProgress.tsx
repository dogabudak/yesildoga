import React from 'react';
import * as S from './FundingProgress.styled';

interface FundingProgressProps {
  raisedAmount: number;
  goalAmount: number;
  accentColor: string;
}

export const FundingProgress: React.FC<FundingProgressProps> = ({
  raisedAmount,
  goalAmount,
  accentColor,
}) => {
  const percent = goalAmount > 0 ? (raisedAmount / goalAmount) * 100 : 0;

  const fmt = (n: number) =>
    new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);

  return (
    <S.Card>
      <S.Amounts>
        <S.Raised color={accentColor}>{fmt(raisedAmount)}</S.Raised>
        <S.Goal>/ {fmt(goalAmount)}</S.Goal>
      </S.Amounts>
      <S.Label>collected so far</S.Label>
      <S.BarTrack>
        <S.BarFill percent={percent} color={accentColor} />
      </S.BarTrack>
    </S.Card>
  );
};
