import React from 'react';
import { Donations } from 'src/types/Donations';
import { colors } from 'src/style/colors';
import * as S from './OurMission.styled';

const categories = [
  {
    name: Donations.forest,
    icon: '🌳',
    color: colors[Donations.forest],
    description: 'Reforestation and preserving green lungs of our planet.',
  },
  {
    name: Donations.seas,
    icon: '🌊',
    color: colors[Donations.seas],
    description: 'Ocean cleanup and protecting marine ecosystems.',
  },
  {
    name: Donations.agriculture,
    icon: '🌾',
    color: colors[Donations.agriculture],
    description: 'Sustainable farming for healthier communities.',
  },
  {
    name: Donations.education,
    icon: '📚',
    color: colors[Donations.education],
    description: 'Giving every child a fair chance to learn and grow.',
  },
  {
    name: Donations.charity,
    icon: '🤝',
    color: colors[Donations.charity],
    description: 'Direct support for people and communities in need.',
  },
];

export function OurMission(): JSX.Element {
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
