import React from 'react';
import Head from 'next/head';

import { SITE_NAME, absoluteUrl } from 'src/constants/site';

type Props = {
  title: string;
  description: string;
  /** Path only, e.g. `/donate`. Query strings are intentionally excluded. */
  path: string;
  image?: string;
  type?: 'website' | 'article';
};

const DEFAULT_IMAGE = '/og-image.png';

export const Seo = ({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = 'website',
}: Props): JSX.Element => {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <link rel='canonical' href={url} />

      <meta property='og:url' content={url} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={imageUrl} />
      <meta property='og:type' content={type} />
      <meta property='og:site_name' content={SITE_NAME} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={imageUrl} />
    </Head>
  );
};
