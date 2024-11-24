import React from 'react';
import * as S from './IndexLayout.styled';
import { Donations } from '@type/Donations';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export function IndexLayout(): JSX.Element {
  // TODO move this TabPanel styles properly
  return (
    <>
      <Tabs defaultIndex={1}>
        <TabList>
          <Tab> {Donations.agriculture} </Tab>
          <Tab> {Donations.education} </Tab>
          <Tab> {Donations.charity} </Tab>
          <Tab> {Donations.seas} </Tab>
          <Tab> {Donations.forest} </Tab>
        </TabList>
        <TabPanel style={{ width: '100%', height: '100vh', padding: '20px' }}>
          <S.AgricultureTheme>
            <h2>{Donations.agriculture}</h2>
          </S.AgricultureTheme>
        </TabPanel>
        <TabPanel style={{ width: '100%', height: '100vh', padding: '20px' }}>
          <S.EducationTheme>
            <h2>{Donations.education}</h2>
          </S.EducationTheme>
        </TabPanel>
        <TabPanel style={{ width: '100%', height: '100vh', padding: '20px' }}>
          <S.CharityTheme>
            <h2>{Donations.charity}</h2>
          </S.CharityTheme>
        </TabPanel>
        <TabPanel style={{ width: '100%', height: '100vh', padding: '20px' }}>
          <S.SeasTheme>
            <h2>{Donations.seas}</h2>
          </S.SeasTheme>
        </TabPanel>
        <TabPanel style={{ width: '100%', height: '100vh', padding: '20px' }}>
          <S.ForestTheme>
            <h2>{Donations.forest}</h2>
          </S.ForestTheme>
        </TabPanel>
      </Tabs>
    </>
  );
}
