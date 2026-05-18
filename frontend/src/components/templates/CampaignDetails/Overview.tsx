import React from 'react';
import * as S from './Overview.styled';

interface OverviewProps {
  description: string;
  location: string;
  targetMetric: string;
  budget: string;
  timeline: string;
  accentColor: string;
}

export const Overview: React.FC<OverviewProps> = ({
  description,
  location,
  targetMetric,
  budget,
  timeline,
  accentColor,
}) => {
  const paragraphs = description.split('\n\n').filter(Boolean);

  const facts = [
    { label: 'Location', value: location },
    { label: 'Target', value: targetMetric },
    { label: 'Budget', value: budget },
    { label: 'Timeline', value: timeline },
  ];

  return (
    <S.Section>
      <S.Description>
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </S.Description>
      <S.FactsGrid>
        {facts.map((f) => (
          <S.FactCard key={f.label} accentColor={accentColor}>
            <S.FactLabel>{f.label}</S.FactLabel>
            <S.FactValue>{f.value}</S.FactValue>
          </S.FactCard>
        ))}
      </S.FactsGrid>
    </S.Section>
  );
};
