import React from 'react';
import { IndexLayout } from 'src/components/templates/IndexLayout/IndexLayout';
import { CompanySearch } from 'src/components/templates/CompanySearch/CompanySearch';
import { HowItWorks } from 'src/components/templates/HowItWorks/HowItWorks';
import { OurMission } from 'src/components/templates/OurMission/OurMission';
import Head from 'next/head';

export default function Index(): JSX.Element {
  return (
    <>
      <Head>
        <title>YeşilDoğa – Check Any Company's Carbon Footprint Instantly</title>
        <meta name='description' content="YeşilDoğa is a free Chrome extension that shows you any company's carbon neutrality and sustainability data instantly." />
        <meta property='og:title' content="YeşilDoğa – Check Any Company's Carbon Footprint Instantly" />
        <meta property='og:description' content="Free Chrome extension that shows you any company's carbon neutrality and sustainability data instantly." />
        <meta property='og:image' content='/og-image.png' />
        <meta property='og:type' content='website' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content="YeşilDoğa – Check Any Company's Carbon Footprint Instantly" />
        <meta name='twitter:description' content="Free Chrome extension that shows you any company's carbon neutrality and sustainability data instantly." />
        <meta name='twitter:image' content='/og-image.png' />
      </Head>
      <IndexLayout />
      <CompanySearch />
      <HowItWorks />
      <OurMission />
    </>
  );
}
