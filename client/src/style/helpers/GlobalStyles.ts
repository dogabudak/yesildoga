import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { reset } from 'styled-reset';
import { fonts } from './css/fonts';

export const GlobalStyles = createGlobalStyle`
  ${normalize}
  ${reset}
  ${fonts}
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    line-height: 1;
  }

  a, a:visited {
    color: inherit;
    text-decoration: inherit;
  }

  body {
    background: #dcdcdc;
  }
`;
