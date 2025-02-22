import styled from 'styled-components';
import { DonationBackgroundPath, Donations } from '@type/Donations';
import { colors } from '@style/colors';

// Search Bar Styles
export const SearchBarContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 40px auto;
  max-width: 600px;
  width: 100%;
`;

export const SearchInput = styled.input.attrs((props: any) => ({
  type: props.type || 'text',
  placeholder: props.placeholder || 'Search...',
}))`
  border: 2px solid ${colors.primary};
  border-radius: 25px;
  font-size: 1rem;
  outline: none;
  padding: 12px 20px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  width: 70%;

  &:focus {
    border-color: ${colors.secondary};
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
  }
`;

export const SearchButton = styled.button`
  background-color: ${colors.primary};
  border: none;
  border-radius: 25px;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: 12px 24px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${colors.secondary};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Common styles for all themes
const CommonThemeStyles = styled.div`
  align-items: center;
  background-position: center;
  background-size: cover;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
  display: flex;
  height: 100vh;
  justify-content: center;
  padding: 40px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
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
`;

// Individual themes
export const ForestTheme = styled(CommonThemeStyles)`
  background: linear-gradient(rgba(0, 50, 0, 0.7), rgba(0, 50, 0, 0.7)),
    url(${DonationBackgroundPath.forest}) no-repeat center center;
`;

export const EducationTheme = styled(CommonThemeStyles)`
  background: linear-gradient(rgba(0, 0, 100, 0.7), rgba(0, 0, 100, 0.7)),
    url(${DonationBackgroundPath.education}) no-repeat center center;
`;

export const AgricultureTheme = styled(CommonThemeStyles)`
  background: linear-gradient(rgba(50, 100, 0, 0.7), rgba(50, 100, 0, 0.7)),
    url(${DonationBackgroundPath.agriculture}) no-repeat center center;
`;

export const CharityTheme = styled(CommonThemeStyles)`
  background: linear-gradient(rgba(100, 0, 0, 0.7), rgba(100, 0, 0, 0.7)),
    url(${DonationBackgroundPath.charity}) no-repeat center center;
`;

export const SeasTheme = styled(CommonThemeStyles)`
  background: linear-gradient(rgba(0, 50, 100, 0.7), rgba(0, 50, 100, 0.7)),
    url(${DonationBackgroundPath.seas}) no-repeat center center;
`;
