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

export const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

export const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-bottom: 24px;
`;

export const Step = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 12px;
  position: relative;
`;

export const DotColumn = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 20px;
`;

export const Dot = styled.div<{ completed: boolean; color: string }>`
  background: ${({ completed, color }) => (completed ? color : '#ccc')};
  border-radius: 50%;
  flex-shrink: 0;
  height: 12px;
  width: 12px;
`;

export const Line = styled.div<{ completed: boolean; color: string }>`
  background: ${({ completed, color }) => (completed ? color : '#e0e0e0')};
  height: 28px;
  width: 2px;
`;

export const StepLabel = styled.span<{ completed: boolean }>`
  color: ${({ completed }) => (completed ? '#333' : '#888')};
  font-size: 0.95rem;
  line-height: 1.3;
  padding-top: 0;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
`;

export const BarTrack = styled.div`
  background: #e8e8e8;
  border-radius: 6px;
  height: 8px;
  overflow: hidden;
  width: 100%;
`;

export const BarFill = styled.div<{ percent: number; color: string }>`
  background: ${({ color }) => color};
  border-radius: 6px;
  height: 100%;
  transition: width 0.4s ease;
  width: ${({ percent }) => percent}%;
`;

export const BarLabel = styled.span`
  color: #666;
  display: block;
  font-size: 0.85rem;
  margin-top: 6px;
  text-align: right;
`;
