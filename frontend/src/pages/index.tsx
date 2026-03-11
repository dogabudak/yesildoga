import React from 'react';
import { IndexLayout } from 'src/components/templates/IndexLayout/IndexLayout';
import { HowItWorks } from 'src/components/templates/HowItWorks/HowItWorks';
import { OurMission } from 'src/components/templates/OurMission/OurMission';
import Head from 'next/head';

export default function Index(): JSX.Element {
  return (
    <>
      <Head>
        <title>Yesildoga</title>
        <meta property='og:title' content='Yesildoga' />
      </Head>
      <IndexLayout />
      <HowItWorks />
      <OurMission />
    </>
  );
}
