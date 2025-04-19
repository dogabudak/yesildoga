import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { withThemes } from 'storybook-addon-themes/react';
import StorybookTheme from './StorybookTheme';
import viewports from './viewports';
import { GlobalStyles } from '../src/style/helpers/GlobalStyles';

addDecorator(withThemes);

addParameters({
  backgrounds: {
    default: 'light',
  },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
  viewport: {
    viewports,
    default: 'desktop',
  },
});

export const decorators = [
  (Story) => (
    <>
      <GlobalStyles />
      {Story()}
    </>
  ),
];
