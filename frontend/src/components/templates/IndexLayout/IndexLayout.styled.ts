import styled from 'styled-components';
import { DonationBackgroundPath } from 'src/types/Donations';

// Common styles for all themes
const CommonThemeStyles = styled.div`
  align-items: center;
  background-position: center;
  background-size: cover;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  color: white;
  display: flex;
  height: 80vh;
  justify-content: center;
  padding: 40px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transform: scale(1.02);
  }

  h2 {
    font-size: 3rem;
    margin-block-end: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    max-width: 600px;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  }
`;

// Content wrapper for better spacing
export const ContentWrapper = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 2rem;
  backdrop-filter: blur(5px);
`;

// Individual themes
export const Theme = styled(CommonThemeStyles)<{
  backgroundImage: string;
  gradientColors: { start: string; end: string };
}>`
  background: linear-gradient(
      ${({ gradientColors }) => `${gradientColors.start}, ${gradientColors.end}`}
    ),
    url(${({ backgroundImage }) => backgroundImage}) no-repeat center center;
`;
