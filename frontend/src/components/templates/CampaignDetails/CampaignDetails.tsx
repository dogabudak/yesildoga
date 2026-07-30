import React, { useEffect, useState } from 'react';
import type { CampaignDetail } from 'src/types/Campaign';
import { getCampaignBySlug } from '@helpers/api/campaigns';
import { ProgressCard } from './ProgressCard';
import { Overview } from './Overview';
import { FundingProgress } from './FundingProgress';
import { SupportButton } from './SupportButton';
import * as S from './CampaignDetails.styled';

interface CampaignDetailsProps {
  campaignName: string;
}

export function CampaignDetails({ campaignName }: CampaignDetailsProps): JSX.Element {
  const [campaign, setCampaign] = useState<CampaignDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getCampaignBySlug(campaignName.toLowerCase())
      .then((data) => {
        if (!cancelled) {setCampaign(data);}
      })
      .catch(() => {
        if (!cancelled) {setError('Failed to load campaign data.');}
      })
      .finally(() => {
        if (!cancelled) {setLoading(false);}
      });

    return () => {
      cancelled = true;
    };
  }, [campaignName]);

  if (loading) {return <S.Spinner />;}
  if (error) {return <S.ErrorMessage>{error}</S.ErrorMessage>;}
  if (!campaign) {return <S.ErrorMessage>Campaign not found.</S.ErrorMessage>;}

  return (
    <S.Wrapper>
      <ProgressCard milestones={campaign.milestones} accentColor={campaign.accent_color} />
      <Overview
        description={campaign.description}
        location={campaign.location}
        targetMetric={campaign.target_metric}
        budget={campaign.budget}
        timeline={campaign.timeline}
        accentColor={campaign.accent_color}
      />
      <FundingProgress
        raisedAmount={campaign.raised_amount}
        goalAmount={campaign.goal_amount}
        accentColor={campaign.accent_color}
      />
      <SupportButton slug={campaign.slug} accentColor={campaign.accent_color} />
    </S.Wrapper>
  );
}
