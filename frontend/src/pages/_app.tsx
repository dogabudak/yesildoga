import React from 'react';
import { Header } from 'src/components/molecules/Header/Header';
import { colors } from 'src/style/colors';
import { GlobalStyles } from 'src/style/helpers/GlobalStyles';
import type { AppProps } from 'next/app';
import NextNprogress from 'nextjs-progressbar';
import { Footer } from 'src/components/molecules/Footer/Footer';

function YesilDogaMainPage({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <GlobalStyles />
      <NextNprogress color={colors.primary} height={2} />
      <Header />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default YesilDogaMainPage;
