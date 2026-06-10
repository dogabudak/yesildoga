import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import { untilMobile } from 'src/style/helpers/mixins/mediaQueries';
import Link from 'next/link';
import { getCampaignBySlug } from 'src/helpers/api/campaigns';

const PRESETS = [50, 100, 250, 500];

export default function DonatePage() {
  const router = useRouter();
  const slug = (typeof router.query.campaign === 'string' ? router.query.campaign : '').toLowerCase();

  const [campaignName, setCampaignName] = useState('');
  const [accentColor, setAccentColor] = useState('#0C9346');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  useEffect(() => {
    if (!slug) return;
    getCampaignBySlug(slug)
      .then((data) => {
        setCampaignName(data.name);
        setAccentColor(data.accent_color || '#0C9346');
      })
      .catch(() => { /* keep defaults */ });
  }, [slug]);

  const activeAmount = selectedAmount ?? (customAmount ? Number(customAmount) : null);

  return (
    <Page>
      <Card>
        <BackLink href='/'>&#8592; Back to campaigns</BackLink>

        <Title>
          Donate{campaignName ? ` to ${campaignName}` : ''}
        </Title>

        <Label>Choose an amount</Label>
        <PresetRow>
          {PRESETS.map((amount) => (
            <PresetButton
              key={amount}
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
          disabled={!activeAmount || activeAmount <= 0}
          accentColor={accentColor}
        >
          Proceed to Payment{activeAmount && activeAmount > 0 ? ` — ₺${activeAmount}` : ''}
        </ProceedButton>

        <Notice>Payment integration coming soon. This page is a preview.</Notice>
      </Card>
    </Page>
  );
}

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
    border-color: #0C9346;
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
