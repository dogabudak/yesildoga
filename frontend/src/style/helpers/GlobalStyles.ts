import { createGlobalStyle, css } from 'styled-components';
import { normalize } from 'styled-normalize';
import { reset } from 'styled-reset';
import { fonts } from 'src/style/helpers/css/fonts';
import { untilMobile } from 'src/style/helpers/mixins/mediaQueries';

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
    /*
     * Not 'justify-content: center' — when the tabs are wider than the
     * viewport, centering pushes the first tab to a negative offset where it
     * can never be scrolled back into view. The auto margins on the first and
     * last tab centre the row when there is spare space and collapse to 0 when
     * there is not, leaving the row scrollable from its true start.
     */
    justify-content: flex-start;
    margin: 0;
    -webkit-overflow-scrolling: touch;
    overflow-x: auto;
    padding: 0 16px;
    scrollbar-width: none;
  }

  .react-tabs__tab-list::-webkit-scrollbar {
    display: none;
  }

  .react-tabs__tab-list > .react-tabs__tab:first-child {
    margin-inline-start: auto;
  }

  .react-tabs__tab-list > .react-tabs__tab:last-child {
    margin-inline-end: auto;
  }

  .react-tabs__tab {
    border: none;
    border-bottom: 3px solid transparent;
    bottom: -1px;
    color: #888;
    cursor: pointer;
    display: inline-block;
    flex: 0 0 auto;
    font-size: 0.95rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    list-style: none;
    padding: 14px 20px;
    position: relative;
    text-transform: uppercase;
    transition: color 0.2s ease, border-color 0.2s ease;
    white-space: nowrap;
  }

  ${untilMobile(css`
    .react-tabs__tab {
      font-size: 0.85rem;
      padding: 13px 14px;
    }
  `)}

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
