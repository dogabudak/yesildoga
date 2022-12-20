import React, { useEffect, useState} from 'react';
import { queryFilterToHTTPFilter } from '@helpers/queryFilterToHTTPFilter';
import { Filter } from '../Filter/Filter';
import { makeRequest } from './IndexLayout.helpers';
import type { Donations } from '@type/Donations';
import { useRouter } from 'next/router';
import type { IndexServerProps } from '../../../pages';
import * as S from './IndexLayout.styled';

/**
 * The Index Page Layout
 */

export function IndexLayout({ absences, filters }: IndexServerProps['props']): JSX.Element {
  const [storedDonations, setStoredDonations] = useState<Donations[]>(absences);
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
      const result = await makeRequest(page, filter)
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
  const handlePageClick = (event) => {
    setPage(event.selected)
  };

  return (
    <>
    <S.IndexLayout>
      <S.FilterContainer>
        <Filter
          filters={filters}
          onSubmit={(selectedFilters) => handleFilter(selectedFilters)}
          queryFilters={router.query}
        />
      </S.FilterContainer>
    </S.IndexLayout>
        <S.PaginateContainer>
          <S.MyPagination
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={totalPageCount}
              previousLabel="< previous"
          />
        </S.PaginateContainer>
      </>
  );
}
