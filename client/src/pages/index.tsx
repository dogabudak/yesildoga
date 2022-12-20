import React from 'react';
import { IndexLayout } from '@templates/IndexLayout/IndexLayout';
import type { Donations } from '@type/Donations';
import type { Filters } from '@type/Filter.type';
import Head from 'next/head';

export type IndexServerProps = {
  props: {
    absences: Donations[];
    filters: Filters;
  };
};

export default function Index({ absences, filters }: IndexServerProps['props']): JSX.Element {
  return (
    <>
      <Head>
        <title>Yesildoga</title>
        <meta property='og:title' content='Yesildoga' />
      </Head>
      <IndexLayout absences={absences} filters={filters} />
    </>
  );
}

