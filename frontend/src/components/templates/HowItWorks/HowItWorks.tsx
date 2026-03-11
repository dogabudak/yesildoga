import React from 'react';
import * as S from './HowItWorks.styled';

const steps = [
  {
    number: 1,
    icon: '🧩',
    title: 'Install the Extension',
    description:
      'Add Green Score to your Chrome browser in one click. It runs quietly in the background — no setup needed.',
  },
  {
    number: 2,
    icon: '🌐',
    title: 'Browse the Web',
    description:
      'Visit any website as you normally would. Green Score automatically checks if we have sustainability data for that company.',
  },
  {
    number: 3,
    icon: '🌿',
    title: 'See the Green Score',
    description:
      'Get instant insight into the company\'s carbon footprint, renewable energy usage, and discover greener alternatives.',
  },
];

export function HowItWorks(): JSX.Element {
  return (
    <S.Section>
      <S.Title>How It Works</S.Title>
      <S.Subtitle>
        Three simple steps to make your browsing more sustainable
      </S.Subtitle>

      <S.StepsContainer>
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <S.Step>
              <S.StepNumber>{step.number}</S.StepNumber>
              <S.StepIcon>{step.icon}</S.StepIcon>
              <S.StepTitle>{step.title}</S.StepTitle>
              <S.StepDescription>{step.description}</S.StepDescription>
            </S.Step>
            {index < steps.length - 1 && <S.Connector>→</S.Connector>}
          </React.Fragment>
        ))}
      </S.StepsContainer>
    </S.Section>
  );
}
