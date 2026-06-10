import React, { useState, useEffect } from 'react';
import * as S from 'src/components/templates/IndexLayout/IndexLayout.styled';
import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { CampaignDetails } from '@templates/CampaignDetails/CampaignDetails';
import { getCampaigns } from '@helpers/api/campaigns';
import { campaignsToTabs, fallbackTabs } from './IndexLayout.helpers';
import type { TabData } from './IndexLayout.helpers';

resetIdCounter();

const CHROME_STORE_URL =
  process.env.NEXT_PUBLIC_CHROME_STORE_URL || '#';

export function IndexLayout(): JSX.Element {
  const [visibleProject, setVisibleProject] = useState<string | null>(null);
  const [tabs, setTabs] = useState<TabData[]>(fallbackTabs);

  useEffect(() => {
    getCampaigns()
      .then((campaigns) => setTabs(campaignsToTabs(campaigns)))
      .catch(() => { /* keep fallback */ });
  }, []);

  const toggleProject = (name: string) => {
    setVisibleProject(visibleProject === name ? null : name);
  };

  return (
    <Tabs defaultIndex={0}>
      <TabList>
        {tabs.map((tab) => (
          <Tab key={tab.slug}>{tab.name}</Tab>
        ))}
      </TabList>

      {tabs.map((tab) => (
        <TabPanel key={tab.slug}>
          <S.Hero backgroundImage={tab.backgroundImage}>
            <S.HeroOverlay />
            <S.HeroContent>
              <S.HeroTitle>{tab.title}</S.HeroTitle>
              <S.HeroDescription>{tab.description}</S.HeroDescription>
              <S.HeroButtons>
                <S.DiscoverButton
                  accentColor={tab.accentColor}
                  onClick={() => toggleProject(tab.slug)}
                >
                  {visibleProject === tab.slug ? 'Hide Details' : 'Discover This Project'}
                </S.DiscoverButton>
                <S.ChromeStoreButton
                  href={CHROME_STORE_URL}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <S.ChromeIcon
                    src='https://www.google.com/chrome/static/images/chrome-logo-m100.svg'
                    alt=''
                  />
                  Add to Chrome — It&#39;s Free
                </S.ChromeStoreButton>
              </S.HeroButtons>
            </S.HeroContent>
          </S.Hero>

          <S.ProjectSection isVisible={visibleProject === tab.slug}>
            <S.ProjectInner>
              <CampaignDetails campaignName={tab.slug} />
            </S.ProjectInner>
          </S.ProjectSection>
        </TabPanel>
      ))}
    </Tabs>
  );
}
