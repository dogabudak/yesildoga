import React from 'react';
import * as S from 'src/components/templates/IndexLayout/IndexLayout.styled';
import { Donations } from 'src/types/Donations';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { SearchBar } from 'src/components/molecules/SearchBar/SearchBar';

// TODO goalId's should come from somewhere
export function IndexLayout(): JSX.Element {
  return (
    <>
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
            <SearchBar goalId='todo' />
            <S.ContentWrapper>
              <h2>{Donations.agriculture}</h2>
              <p>Support sustainable farming and help communities thrive.</p>
            </S.ContentWrapper>
          </S.AgricultureTheme>
        </TabPanel>

        <TabPanel>
          <S.EducationTheme>
            <SearchBar goalId='todo' />
            <S.ContentWrapper>
              <h2>{Donations.education}</h2>
              <p>Empower the next generation through education.</p>
            </S.ContentWrapper>
          </S.EducationTheme>
        </TabPanel>

        <TabPanel>
          <S.CharityTheme>
            <SearchBar goalId='todo' />
            <S.ContentWrapper>
              <h2>{Donations.charity}</h2>
              <p>Make a difference by supporting those in need.</p>
            </S.ContentWrapper>
          </S.CharityTheme>
        </TabPanel>

        <TabPanel>
          <S.SeasTheme>
            <SearchBar goalId='todo' />
            <S.ContentWrapper>
              <h2>{Donations.seas}</h2>
              <p>Protect our oceans and marine life.</p>
            </S.ContentWrapper>
          </S.SeasTheme>
        </TabPanel>

        <TabPanel>
          <S.ForestTheme>
            <SearchBar goalId='todo' />
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
