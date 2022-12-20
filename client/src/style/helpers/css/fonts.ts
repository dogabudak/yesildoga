import { css } from 'styled-components';

export const fonts = css`
  @font-face {
    font-display: swap;
    font-family: 'PT Sans';
    font-weight: 700;
    src: url(/fonts/PT_Sans/PTSans-Bold.ttf) format('truetype');
  }

  @font-face {
    font-display: swap;
    font-family: 'PT Sans';
    font-weight: 700;
    font-style: italic;
    src: url(/fonts/PT_Sans/PTSans-BoldItalic.ttf) format('truetype');
  }

  @font-face {
    font-display: swap;
    font-family: 'PT Sans';
    font-weight: 400;
    src: url(/fonts/PT_Sans/PTSans-Regular.ttf) format('truetype');
  }

  @font-face {
    font-display: swap;
    font-family: 'PT Sans';
    font-weight: 400;
    font-style: italic;
    src: url(/fonts/PT_Sans/PTSans-Italic.ttf) format('truetype');
  }
`;
