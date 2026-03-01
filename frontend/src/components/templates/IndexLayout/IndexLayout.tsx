import React from 'react';
import * as S from 'src/components/templates/IndexLayout/IndexLayout.styled';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { ProjectTab } from '@templates/Project/Project';
import { tabData } from './IndexLayout.helpers';

// TODO goalId's should come from somewhere
export function IndexLayout(): JSX.Element {
  return (
    <>
      <Tabs defaultIndex={1}>
        <TabList>
          {tabData.map((tab) => (
            <Tab key={tab.name}>{tab.name}</Tab>
          ))}
        </TabList>

        {tabData.map((tab) => (
          <TabPanel key={tab.name}>
            <S.Theme backgroundImage={tab.backgroundImage} gradientColors={tab.gradientColors}>
              <S.ContentWrapper>
                <h2>{tab.title}</h2>
                <p>{tab.description}</p>
                <ProjectTab goalId='todo' projectName={tab.name} />
              </S.ContentWrapper>
            </S.Theme>
          </TabPanel>
        ))}
      </Tabs>
    </>
  );
}
