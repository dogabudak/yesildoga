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
  margin: 0 auto 60px;
  max-width: 600px;

  ${untilMobile(css`
    font-size: 1rem;
    margin-bottom: 40px;
  `)}
`;

export const StepsContainer = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  margin: 0 auto;
  max-width: 1000px;

  ${untilTablet(css`
    flex-direction: column;
    align-items: center;
    gap: 32px;
  `)}
`;

export const Step = styled.div`
  flex: 1;
  max-width: 280px;
  padding: 0 16px;

  ${untilTablet(css`
    max-width: 400px;
  `)}
`;

export const StepNumber = styled.div`
  align-items: center;
  background: #0c9346;
  border-radius: 50%;
  color: #fff;
  display: flex;
  font-size: 1.4rem;
  font-weight: bold;
  height: 56px;
  justify-content: center;
  margin: 0 auto 20px;
  width: 56px;
`;

export const StepIcon = styled.div`
  font-size: 2.8rem;
  margin-bottom: 16px;
`;

export const StepTitle = styled.h3`
  color: #333;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const StepDescription = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
`;

export const Connector = styled.div`
  align-items: center;
  color: #ccc;
  display: flex;
  font-size: 1.5rem;

  ${untilTablet(css`
    transform: rotate(90deg);
  `)}
`;
