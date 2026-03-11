import React, { useState } from 'react';
import * as S from 'src/components/templates/IndexLayout/IndexLayout.styled';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { ProjectTab } from '@templates/Project/Project';
import { tabData } from './IndexLayout.helpers';

export function IndexLayout(): JSX.Element {
  const [visibleProject, setVisibleProject] = useState<string | null>(null);

  const toggleProject = (name: string) => {
    setVisibleProject(visibleProject === name ? null : name);
  };

  return (
    <Tabs defaultIndex={0}>
      <TabList>
        {tabData.map((tab) => (
          <Tab key={tab.name}>{tab.name}</Tab>
        ))}
      </TabList>

      {tabData.map((tab) => (
        <TabPanel key={tab.name}>
          <S.Hero backgroundImage={tab.backgroundImage}>
            <S.HeroOverlay />
            <S.HeroContent>
              <S.HeroTitle>{tab.title}</S.HeroTitle>
              <S.HeroDescription>{tab.description}</S.HeroDescription>
              <S.DiscoverButton
                accentColor={tab.accentColor}
                onClick={() => toggleProject(tab.name)}
              >
                {visibleProject === tab.name ? 'Hide Details' : 'Discover This Project'}
              </S.DiscoverButton>
            </S.HeroContent>
          </S.Hero>

          <S.ProjectSection isVisible={visibleProject === tab.name}>
            <S.ProjectInner>
              <ProjectTab goalId='todo' projectName={tab.name} />
            </S.ProjectInner>
          </S.ProjectSection>
        </TabPanel>
      ))}
    </Tabs>
  );
}
