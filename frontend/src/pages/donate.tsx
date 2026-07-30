import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';

import { getCampaigns } from 'src/helpers/api/campaigns';
import { untilMobile } from 'src/style/helpers/mixins/mediaQueries';
import type { CampaignSummary } from 'src/types/Campaign';

const PRESETS = [50, 100, 250, 500];
const DEFAULT_ACCENT = '#0C9346';

const Page = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  padding: 40px 16px;
  background: #f5f5f5;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  max-width: 480px;
  padding: 40px 36px;
  width: 100%;

  ${untilMobile(css`
    padding: 28px 20px;
  `)}
`;

const BackLink = styled(Link)`
  color: #666;
  display: inline-block;
  font-size: 0.9rem;
  margin-bottom: 20px;
  text-decoration: none;

  &:hover {
    color: #333;
  }
`;

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 28px;
`;

const Label = styled.label`
  color: #666;
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 10px;
`;

const ProjectGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 24px;
`;

const ProjectButton = styled.button<{ active: boolean; accentColor: string }>`
  align-items: center;
  background: ${({ active, accentColor }) => (active ? `${accentColor}18` : '#f7f7f7')};
  border: 2px solid ${({ active, accentColor }) => (active ? accentColor : '#e6e6e6')};
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  font-family: inherit;
  gap: 10px;
  padding: 12px 14px;
  text-align: left;
  transition: all 0.15s;

  &:hover {
    border-color: ${({ accentColor }) => accentColor};
  }
`;

const ProjectIcon = styled.span`
  font-size: 1.4rem;
  line-height: 1;
`;

const ProjectName = styled.span`
  color: #333;
  font-size: 0.9rem;
  font-weight: 700;
`;

const PresetRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 24px;

  ${untilMobile(css`
    flex-wrap: wrap;
  `)}
`;

const PresetButton = styled.button<{ active: boolean; accentColor: string }>`
  background: ${({ active, accentColor }) => (active ? accentColor : '#f0f0f0')};
  border: 2px solid ${({ active, accentColor }) => (active ? accentColor : '#e0e0e0')};
  border-radius: 10px;
  color: ${({ active }) => (active ? '#fff' : '#333')};
  cursor: pointer;
  flex: 1;
  font-family: inherit;
  font-size: 1.05rem;
  font-weight: 700;
  padding: 14px 8px;
  transition: all 0.15s;

  &:hover {
    border-color: ${({ accentColor }) => accentColor};
  }
`;

const CustomInput = styled.input`
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-family: inherit;
  font-size: 1rem;
  margin-bottom: 28px;
  outline: none;
  padding: 14px 16px;
  width: 100%;

  &:focus {
    border-color: #0c9346;
  }
`;

const ProceedButton = styled.button<{ accentColor: string }>`
  background: ${({ accentColor }) => accentColor};
  border: none;
  border-radius: 999px;
  color: #fff;
  cursor: pointer;
  font-family: inherit;
  font-size: 1.1rem;
  font-weight: 700;
  padding: 16px;
  transition: opacity 0.2s;
  width: 100%;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  &:not(:disabled):hover {
    opacity: 0.9;
  }
`;

const Notice = styled.p`
  color: #999;
  font-size: 0.8rem;
  margin-top: 16px;
  text-align: center;
`;

export default function DonatePage(): JSX.Element {
  const router = useRouter();
  const querySlug = (typeof router.query.campaign === 'string' ? router.query.campaign : '').toLowerCase();

  const [campaigns, setCampaigns] = useState<CampaignSummary[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>('');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  useEffect(() => {
    getCampaigns()
      .then((data) => setCampaigns(data))
      .catch(() => { /* keep empty; selector just won't render */ });
  }, []);

  // Pre-select the campaign passed via URL once campaigns have loaded.
  useEffect(() => {
    if (querySlug && campaigns.some((c) => c.slug === querySlug)) {
      setSelectedSlug(querySlug);
    }
  }, [querySlug, campaigns]);

  const selectedCampaign = campaigns.find((c) => c.slug === selectedSlug) || null;
  const accentColor = selectedCampaign?.accent_color || DEFAULT_ACCENT;
  const activeAmount = selectedAmount ?? (customAmount ? Number(customAmount) : null);
  const canProceed = Boolean(selectedSlug) && Boolean(activeAmount) && (activeAmount ?? 0) > 0;

  return (
    <Page>
      <Card>
        <BackLink href='/'>&#8592; Back to campaigns</BackLink>

        <Title>
          Donate{selectedCampaign ? ` to ${selectedCampaign.name}` : ''}
        </Title>

        <Label>Choose a project to support</Label>
        <ProjectGrid>
          {campaigns.map((campaign) => (
            <ProjectButton
              key={campaign.slug}
              type='button'
              active={selectedSlug === campaign.slug}
              accentColor={campaign.accent_color || DEFAULT_ACCENT}
              onClick={() => setSelectedSlug(campaign.slug)}
            >
              <ProjectIcon>{campaign.icon}</ProjectIcon>
              <ProjectName>{campaign.name}</ProjectName>
            </ProjectButton>
          ))}
        </ProjectGrid>

        <Label>Choose an amount</Label>
        <PresetRow>
          {PRESETS.map((amount) => (
            <PresetButton
              key={amount}
              type='button'
              active={selectedAmount === amount}
              accentColor={accentColor}
              onClick={() => {
                setSelectedAmount(amount);
                setCustomAmount('');
              }}
            >
              &#8378;{amount}
            </PresetButton>
          ))}
        </PresetRow>

        <Label>Or enter a custom amount</Label>
        <CustomInput
          type='number'
          min='1'
          placeholder='&#8378; Custom amount'
          value={customAmount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCustomAmount(e.target.value);
            setSelectedAmount(null);
          }}
        />

        <ProceedButton
          disabled={!canProceed}
          accentColor={accentColor}
        >
          Proceed to Payment{activeAmount && activeAmount > 0 ? ` — ₺${activeAmount}` : ''}
        </ProceedButton>

        {!selectedSlug && (
          <Notice>Select a project above to continue.</Notice>
        )}
        <Notice>Payment integration coming soon. This page is a preview.</Notice>
      </Card>
    </Page>
  );
}
