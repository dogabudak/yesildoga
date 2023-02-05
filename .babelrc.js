const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'styled-components',
      {
        ssr: true,
        displayName: isDev,
        namespace: 'im',
      },
    ],
  ],
};
