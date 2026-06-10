import React, { useEffect, useState } from 'react';
import { getCampaigns } from 'src/helpers/api/campaigns';
import type { CampaignSummary } from 'src/types/Campaign';
import * as S from './OurMission.styled';

const FALLBACK_CATEGORIES = [
  { name: 'Forest', icon: '🌳', color: '#0C6100', description: 'Reforestation and preserving green lungs of our planet.' },
  { name: 'Seas & Oceans', icon: '🌊', color: '#23cafd', description: 'Ocean cleanup and protecting marine ecosystems.' },
  { name: 'Agriculture', icon: '🌾', color: '#dabc0c', description: 'Sustainable farming for healthier communities.' },
  { name: 'Education', icon: '📚', color: '#0015fa', description: 'Giving every child a fair chance to learn and grow.' },
  { name: 'Charity', icon: '🤝', color: '#6d836c', description: 'Direct support for people and communities in need.' },
];

function campaignsToCategories(campaigns: CampaignSummary[]) {
  return campaigns.map((c) => ({
    name: c.name,
    icon: c.icon,
    color: c.accent_color,
    description: c.tagline,
  }));
}

export function OurMission(): JSX.Element {
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);

  useEffect(() => {
    getCampaigns()
      .then((campaigns) => setCategories(campaignsToCategories(campaigns)))
      .catch(() => { /* keep fallback */ });
  }, []);

  return (
    <S.Section>
      <S.Inner>
        <S.Title>Where Your Impact Goes</S.Title>
        <S.Subtitle>
          We don&apos;t keep profits. <S.Highlight>Every single cent</S.Highlight> we earn
          from advertisements and partnerships is funneled directly into real-world
          projects across five categories — all focused on the good of humanity
          and building a greener world.
        </S.Subtitle>

        <S.Divider />

        <S.CategoriesGrid>
          {categories.map((cat) => (
            <S.CategoryCard key={cat.name} accentColor={cat.color}>
              <S.CategoryIcon>{cat.icon}</S.CategoryIcon>
              <S.CategoryName>{cat.name}</S.CategoryName>
              <S.CategoryDescription>{cat.description}</S.CategoryDescription>
            </S.CategoryCard>
          ))}
        </S.CategoriesGrid>

        <S.TransparencyBanner>
          <S.BannerIcon>📊</S.BannerIcon>
          <S.BannerContent>
            <S.BannerTitle>Full Transparency, Always</S.BannerTitle>
            <S.BannerText>
              We publicly track and display exactly how much money we&apos;ve raised
              and where it goes — project by project. No hidden fees, no corporate
              overhead. You browse the web, companies get scored, and the revenue
              funds a better world. It&apos;s that simple.
            </S.BannerText>
          </S.BannerContent>
        </S.TransparencyBanner>
      </S.Inner>
    </S.Section>
  );
}
