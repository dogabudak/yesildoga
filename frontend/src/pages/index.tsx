import React from 'react';
import { IndexLayout } from 'src/components/templates/IndexLayout/IndexLayout';
import Head from 'next/head';

export default function Index(): JSX.Element {
  return (
    <>
      <Head>
        <title>Yesildoga</title>
        <meta property='og:title' content='Yesildoga' />
      </Head>
      <IndexLayout />
    </>
  );
}
