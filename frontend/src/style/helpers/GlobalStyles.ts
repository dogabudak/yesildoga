import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { reset } from 'styled-reset';
import { fonts } from 'src/style/helpers/css/fonts';

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

  .react-tabs {
    -webkit-tap-highlight-color: transparent;
  }

  .react-tabs__tab-list {
    border-bottom: 2px solid #eee;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
  }

  .react-tabs__tab {
    display: inline-block;
    border: none;
    border-bottom: 2px solid transparent;
    bottom: -2px;
    position: relative;
    list-style: none;
    padding: 12px 24px;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: bold;
    color: #555;
    transition: all 0.2s ease-in-out;
  }

  .react-tabs__tab--selected {
    border-bottom: 2px solid #0c9346;
    color: #0c9346;
  }

  .react-tabs__tab--disabled {
    color: #ccc;
    cursor: default;
  }

  .react-tabs__tab:focus {
    outline: none;
  }

  .react-tabs__tab-panel {
    display: none;
  }

  .react-tabs__tab-panel--selected {
    display: block;
  }
`;
