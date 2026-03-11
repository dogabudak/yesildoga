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
    background: #f7f7f7;
  }

  .react-tabs {
    -webkit-tap-highlight-color: transparent;
  }

  .react-tabs__tab-list {
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    gap: 4px;
    justify-content: center;
    margin: 0;
    padding: 0 16px;
  }

  .react-tabs__tab {
    border: none;
    border-bottom: 3px solid transparent;
    bottom: -1px;
    color: #888;
    cursor: pointer;
    display: inline-block;
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    list-style: none;
    padding: 14px 20px;
    position: relative;
    text-transform: uppercase;
    transition: color 0.2s ease, border-color 0.2s ease;
  }

  .react-tabs__tab:hover {
    color: #555;
  }

  .react-tabs__tab--selected {
    border-bottom-color: #0c9346;
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
