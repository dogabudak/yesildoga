export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://yesildoga.onrender.com'
).replace(/\/$/, '');

export const SITE_NAME = 'YeşilDoğa';

export const absoluteUrl = (path: string): string =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
