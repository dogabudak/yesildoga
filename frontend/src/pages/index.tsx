import React from 'react';
import { IndexLayout } from 'src/components/templates/IndexLayout/IndexLayout';
import { CompanySearch } from 'src/components/templates/CompanySearch/CompanySearch';
import { HowItWorks } from 'src/components/templates/HowItWorks/HowItWorks';
import { OurMission } from 'src/components/templates/OurMission/OurMission';
import { Seo } from 'src/components/atoms/Seo/Seo';

export default function Index(): JSX.Element {
  return (
    <>
      <Seo
        title="YeşilDoğa – Check Any Company's Carbon Footprint Instantly"
        description="YeşilDoğa is a free Chrome extension that shows you any company's carbon neutrality and sustainability data instantly."
        path='/'
      />
      <IndexLayout />
      <CompanySearch />
      <HowItWorks />
      <OurMission />
    </>
  );
}
