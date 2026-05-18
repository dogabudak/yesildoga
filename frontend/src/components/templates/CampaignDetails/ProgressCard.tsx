import React from 'react';
import type { Milestone } from 'src/types/Campaign';
import * as S from './ProgressCard.styled';

interface ProgressCardProps {
  milestones: Milestone[];
  accentColor: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ milestones, accentColor }) => {
  const completed = milestones.filter((m) => m.is_completed).length;
  const total = milestones.length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <S.Card>
      <S.Title>Milestones</S.Title>
      <S.Timeline>
        {milestones.map((m, i) => (
          <S.Step key={m.id}>
            <S.DotColumn>
              <S.Dot completed={m.is_completed} color={accentColor} />
              {i < milestones.length - 1 && (
                <S.Line completed={m.is_completed} color={accentColor} />
              )}
            </S.DotColumn>
            <S.StepLabel completed={m.is_completed}>{m.title}</S.StepLabel>
          </S.Step>
        ))}
      </S.Timeline>
      <S.BarTrack>
        <S.BarFill percent={percent} color={accentColor} />
      </S.BarTrack>
      <S.BarLabel>{completed} of {total} completed</S.BarLabel>
    </S.Card>
  );
};
