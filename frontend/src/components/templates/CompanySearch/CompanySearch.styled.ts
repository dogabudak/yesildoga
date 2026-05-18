import styled, { css } from 'styled-components';
import { untilTablet, untilMobile } from 'src/style/helpers/mixins/mediaQueries';

export const Section = styled.section`
  background: #fff;
  padding: 80px 20px;
  text-align: center;
`;

export const Title = styled.h2`
  color: #333;
  font-size: 2.4rem;
  margin-bottom: 16px;

  ${untilMobile(css`
    font-size: 1.8rem;
  `)}
`;

export const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin: 0 auto 40px;
  max-width: 600px;

  ${untilMobile(css`
    font-size: 1rem;
    margin-bottom: 28px;
  `)}
`;

export const SearchWrapper = styled.div`
  margin: 0 auto 40px;
  max-width: 520px;
  position: relative;
`;

export const SearchInput = styled.input`
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-family: inherit;
  font-size: 1.05rem;
  outline: none;
  padding: 14px 20px;
  transition: border-color 0.2s;
  width: 100%;

  &:focus {
    border-color: #0c9346;
  }

  &::placeholder {
    color: #aaa;
  }

  ${untilMobile(css`
    font-size: 1rem;
    padding: 12px 16px;
  `)}
`;

export const Spinner = styled.div`
  color: #888;
  font-size: 0.95rem;
  margin-top: 24px;
`;

export const ErrorMessage = styled.div`
  color: #d32f2f;
  font-size: 0.95rem;
  margin-top: 24px;
`;

export const NoResults = styled.div`
  color: #888;
  font-size: 0.95rem;
  margin-top: 24px;
`;

export const ResultsList = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 1fr);
  margin: 0 auto;
  max-width: 900px;

  ${untilTablet(css`
    grid-template-columns: repeat(2, 1fr);
  `)}

  ${untilMobile(css`
    grid-template-columns: 1fr;
  `)}
`;

export const ResultCard = styled.button`
  background: #f9f9f9;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  font-family: inherit;
  padding: 20px;
  text-align: left;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: #0c9346;
    box-shadow: 0 2px 12px rgba(12, 147, 70, 0.1);
  }
`;

export const ResultCompany = styled.div`
  color: #333;
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 4px;
`;

export const ResultDomain = styled.div`
  color: #888;
  font-size: 0.85rem;
  margin-bottom: 12px;
`;

export const BadgeRow = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

export const CarbonBadge = styled.span<{ neutral: boolean }>`
  background: ${({ neutral }) => (neutral ? '#e8f5e9' : '#fbe9e7')};
  border-radius: 6px;
  color: ${({ neutral }) => (neutral ? '#2e7d32' : '#c62828')};
  font-size: 0.78rem;
  font-weight: 600;
  padding: 3px 8px;
`;

export const RenewableBarWrapper = styled.div`
  background: #e0e0e0;
  border-radius: 4px;
  height: 8px;
  overflow: hidden;
  width: 100%;
`;

export const RenewableBarFill = styled.div<{ percent: number }>`
  background: #0c9346;
  border-radius: 4px;
  height: 100%;
  transition: width 0.3s ease;
  width: ${({ percent }) => Math.min(Math.max(percent, 0), 100)}%;
`;

export const RenewableLabel = styled.div`
  color: #666;
  font-size: 0.8rem;
  margin-top: 4px;
  text-align: right;
`;

/* Detail view */

export const DetailOverlay = styled.div`
  margin: 0 auto 40px;
  max-width: 640px;
  text-align: left;
`;

export const DetailCard = styled.div`
  background: #f9f9f9;
  border: 2px solid #0c9346;
  border-radius: 16px;
  padding: 28px;

  ${untilMobile(css`
    padding: 20px;
  `)}
`;

export const DetailHeader = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const DetailCompany = styled.h3`
  color: #333;
  font-size: 1.4rem;
  margin: 0 0 4px;
`;

export const DetailDomain = styled.div`
  color: #888;
  font-size: 0.9rem;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1;
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: #333;
  }
`;

export const DetailGrid = styled.div`
  display: grid;
  gap: 12px 24px;
  grid-template-columns: 1fr 1fr;

  ${untilMobile(css`
    grid-template-columns: 1fr;
  `)}
`;

export const DetailField = styled.div``;

export const DetailLabel = styled.div`
  color: #888;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  margin-bottom: 2px;
  text-transform: uppercase;
`;

export const DetailValue = styled.div`
  color: #333;
  font-size: 0.95rem;
  line-height: 1.5;
`;

export const DetailDescription = styled.div`
  border-top: 1px solid #e0e0e0;
  color: #444;
  font-size: 0.93rem;
  line-height: 1.6;
  margin-top: 20px;
  padding-top: 20px;
`;

export const DetailAlternatives = styled.div`
  border-top: 1px solid #e0e0e0;
  margin-top: 16px;
  padding-top: 16px;
`;

export const DetailAlternativesLabel = styled.div`
  color: #2e7d32;
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 4px;
`;

export const DetailAlternativesValue = styled.div`
  color: #444;
  font-size: 0.93rem;
  line-height: 1.5;
`;
