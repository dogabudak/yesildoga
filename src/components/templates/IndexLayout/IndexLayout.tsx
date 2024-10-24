import React, { useEffect, useState } from 'react';
import { queryFilterToHTTPFilter } from '@helpers/queryFilterToHTTPFilter';
import * as S from './IndexLayout.styled';
import { makeRequest } from './IndexLayout.helpers';
import { Donations } from '@type/Donations';
import { useRouter } from 'next/router';
import type { IndexServerProps } from '../../../pages';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { ForestTheme } from './IndexLayout.styled';

export function IndexLayout({ donations }: IndexServerProps['props']): JSX.Element {
  const [storedDonations, setStoredDonations] = useState<Donations[]>(donations);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const router = useRouter();
  const [filter, setFilter] = useState(queryFilterToHTTPFilter(router.query));
  useEffect(() => {
    const fetchUsers = async () => {
      if (isLoading) {
        return;
      }
      setLoading(true);
      const result = await makeRequest(page, filter);
      setStoredDonations(result.records);
      setTotalPageCount(result.count / 10);
      setLoading(false);
    };
    fetchUsers();
  }, [filter, page]);

  const handleFilter = (selectedFilters) => {
    setLoading(true);
    setPage(0);
    setFilter(selectedFilters);

    makeRequest(page, selectedFilters).then((result) => {
      setStoredDonations(result.records);
      setTotalPageCount(result.count / 10);
      setLoading(false);
    });
  };

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
