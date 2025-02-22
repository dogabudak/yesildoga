import React from 'react';
import * as S from './IndexLayout.styled';
import { Donations } from '@type/Donations';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export function IndexLayout(): JSX.Element {
  // TODO move this TabPanel styles properly
  // TODO search bar should be inside of this tab panel not all the way up
  return (
    <>
      <S.SearchBarContainer>
        <S.SearchInput type='text' placeholder='Search for a cause...' />
        <S.SearchButton>Search</S.SearchButton>
      </S.SearchBarContainer>

      <Tabs defaultIndex={1}>
        <TabList>
          <Tab>{Donations.agriculture}</Tab>
          <Tab>{Donations.education}</Tab>
          <Tab>{Donations.charity}</Tab>
          <Tab>{Donations.seas}</Tab>
          <Tab>{Donations.forest}</Tab>
        </TabList>

        <TabPanel>
          <S.AgricultureTheme>
            <S.ContentWrapper>
              <h2>{Donations.agriculture}</h2>
              <p>Support sustainable farming and help communities thrive.</p>
            </S.ContentWrapper>
          </S.AgricultureTheme>
        </TabPanel>

        <TabPanel>
          <S.EducationTheme>
            <S.ContentWrapper>
              <h2>{Donations.education}</h2>
              <p>Empower the next generation through education.</p>
            </S.ContentWrapper>
          </S.EducationTheme>
        </TabPanel>

        <TabPanel>
          <S.CharityTheme>
            <S.ContentWrapper>
              <h2>{Donations.charity}</h2>
              <p>Make a difference by supporting those in need.</p>
            </S.ContentWrapper>
          </S.CharityTheme>
        </TabPanel>

        <TabPanel>
          <S.SeasTheme>
            <S.ContentWrapper>
              <h2>{Donations.seas}</h2>
              <p>Protect our oceans and marine life.</p>
            </S.ContentWrapper>
          </S.SeasTheme>
        </TabPanel>

        <TabPanel>
          <S.ForestTheme>
            <S.ContentWrapper>
              <h2>{Donations.forest}</h2>
              <p>Preserve our forests for future generations.</p>
            </S.ContentWrapper>
          </S.ForestTheme>
        </TabPanel>
      </Tabs>
    </>
  );
}
