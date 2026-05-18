import styled, { css } from 'styled-components';
import { untilMobile } from 'src/style/helpers/mixins/mediaQueries';

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Description = styled.div`
  color: #444;
  font-size: 1rem;
  line-height: 1.7;

  p {
    margin: 0 0 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const FactsGrid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 1fr;

  ${untilMobile(css`
    grid-template-columns: 1fr;
  `)}
`;

export const FactCard = styled.div<{ accentColor: string }>`
  background: #fff;
  border: 1px solid #e8e8e8;
  border-left: 4px solid ${({ accentColor }) => accentColor};
  border-radius: 8px;
  padding: 16px;
`;

export const FactLabel = styled.span`
  color: #888;
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  margin-bottom: 4px;
  text-transform: uppercase;
`;

export const FactValue = styled.span`
  color: #222;
  font-size: 1rem;
  font-weight: 600;
`;
