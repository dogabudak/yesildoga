import ReactPaginate from "react-paginate";
import { Tile } from '@organisms/Tile/Tile';
import {
  fromDesktop,
  onlyTablet,
  untilMobile,
  untilTablet,
} from '@style/helpers/mixins/mediaQueries';
import styled, { css } from 'styled-components';

export const IndexLayout = styled.div`
  display: flex;
  margin: 64px auto;
  max-width: 1600px;

  ${untilTablet(css`
    flex-direction: column;
    padding: 0 12px;
  `)}
`;

export const FilterContainer = styled.div`
  flex: 1 1 0;
  margin-right: 8px;
  ${untilTablet(css`
    margin-block-end: 12px;
    margin-inline-end: 0;
  `)}
`;

export const ResultsContainer = styled.div`
  flex-wrap: wrap;
  gap: 106px;
`;
export const PaginateContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  flex-wrap: wrap;
  justify-content: center;
  align-self: flex-end;
`;

export const Result = styled(Tile)`
  ${untilMobile(css`
    flex: 0 0 100%;
  `)}

  ${onlyTablet(css`
    flex: 0 0 calc(50% - 8px);
  `)}

  ${fromDesktop(css`
    flex: 0 0 32%;
    margin-bottom: 20px;
  `)}
`;
export const MyPagination = styled(ReactPaginate).attrs({
  activeClassName: 'active', // default to "disabled"
})`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding: 0 5rem;
  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    border: gray 1px solid;
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }
  li.active a {
    background-color: #0366d6;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`
export const LoadingContainer = styled.div``;
