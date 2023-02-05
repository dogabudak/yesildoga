import React, { useEffect, useState } from 'react';
import { queryFilterToHTTPFilter } from '@helpers/queryFilterToHTTPFilter';
import * as S from './IndexLayout.styled';
import { makeRequest } from './IndexLayout.helpers';
import { Donations } from '@type/Donations';
import { useRouter } from 'next/router';
import type { IndexServerProps } from '../../../pages';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { ThemeProvider } from 'styled-components';

export function IndexLayout({ donations, filters }: IndexServerProps['props']): JSX.Element {
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
  const selectTemplate = (event) => {
    setPage(event.selected);
  };

  return (
    <>
      <Tabs defaultIndex={1}>
        <TabList>
          <Tab> {Donations.agriculture} </Tab>
          <Tab> {Donations.education} </Tab>
          <Tab> {Donations.charity} </Tab>
          <Tab> {Donations.seas} </Tab>
          <Tab> {Donations.tree} </Tab>
        </TabList>
        <TabPanel>
          <S.AgricultureTheme>
            <h2>{Donations.agriculture}</h2>
          </S.AgricultureTheme>
        </TabPanel>
        <TabPanel>
          <S.EducationTheme>
            <h2>{Donations.education}</h2>
          </S.EducationTheme>
        </TabPanel>
        <TabPanel>
          <S.CharityTheme>
            <h2>{Donations.charity}</h2>
          </S.CharityTheme>
        </TabPanel>
        <TabPanel>
          <S.SeasTheme>
            <h2>{Donations.seas}</h2>
          </S.SeasTheme>
        </TabPanel>
        <TabPanel>
          <S.TreeTheme>
            <h2>{Donations.tree}</h2>
          </S.TreeTheme>
        </TabPanel>
      </Tabs>
    </>
  );
}
