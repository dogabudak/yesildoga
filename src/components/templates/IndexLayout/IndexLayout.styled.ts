import ReactPaginate from 'react-paginate';
import { Tile } from '@organisms/Tile/Tile';
import {
  fromDesktop,
  onlyTablet,
  untilMobile,
  untilTablet,
} from '@style/helpers/mixins/mediaQueries';
import styled, { css } from 'styled-components';
import { Donations } from '@type/Donations';

export const IndexLayout = styled.div`
  display: flex;
  margin: auto;
  max-width: 1600px;
  ${untilTablet(css`
    flex-direction: column;
    padding: 0 12px;
  `)}
`;

export const ForestTheme = styled.div`
  background: green;
  border: 2px solid green;
  color: green;
`;
export const EducationTheme = styled.div`
  background: blue;
  border: 2px solid blue;
  color: blue;
`;
export const AgricultureTheme = styled.div`
  background: red;
  border: 2px solid red;
  color: red;
`;
export const CharityTheme = styled.div`
  background: yellow;
  border: 2px solid yellow;
  color: yellow;
`;
export const SeasTheme = styled.div`
  background: aqua;
  border: 2px solid aqua;
  color: aqua;
`;
