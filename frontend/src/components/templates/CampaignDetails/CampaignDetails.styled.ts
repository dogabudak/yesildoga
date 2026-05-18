import styled, { css, keyframes } from 'styled-components';
import { untilMobile } from 'src/style/helpers/mixins/mediaQueries';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Spinner = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 200px;

  &::after {
    animation: ${spin} 0.8s linear infinite;
    border: 3px solid #e0e0e0;
    border-radius: 50%;
    border-top-color: #0C9346;
    content: '';
    height: 32px;
    width: 32px;
  }
`;

export const ErrorMessage = styled.p`
  color: #b00;
  padding: 24px;
  text-align: center;

  ${untilMobile(css`
    font-size: 0.9rem;
  `)}
`;
