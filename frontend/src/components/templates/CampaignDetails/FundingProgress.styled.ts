import styled, { css } from 'styled-components';
import { untilMobile } from 'src/style/helpers/mixins/mediaQueries';

export const Card = styled.div`
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  padding: 28px;

  ${untilMobile(css`
    padding: 20px 16px;
  `)}
`;

export const Amounts = styled.div`
  align-items: baseline;
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
`;

export const Raised = styled.span<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 1.6rem;
  font-weight: 800;
`;

export const Goal = styled.span`
  color: #888;
  font-size: 1rem;
`;

export const Label = styled.span`
  color: #999;
  display: block;
  font-size: 0.85rem;
  margin-bottom: 16px;
`;

export const BarTrack = styled.div`
  background: #e8e8e8;
  border-radius: 8px;
  height: 12px;
  overflow: hidden;
  width: 100%;
`;

export const BarFill = styled.div<{ percent: number; color: string }>`
  background: ${({ color }) => color};
  border-radius: 8px;
  height: 100%;
  transition: width 0.4s ease;
  width: ${({ percent }) => Math.min(percent, 100)}%;
`;
