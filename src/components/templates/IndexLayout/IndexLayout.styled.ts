import styled from 'styled-components';
import { Donations } from '@type/Donations';
import { colors } from '@style/colors';

export const ForestTheme = styled.div`
  background: ${colors[Donations.forest]};
  border: 2px solid ${colors[Donations.forest]};
  color: ${colors[Donations.forest]};
`;
export const EducationTheme = styled.div`
  background: ${colors[Donations.education]};
  border: 2px solid ${colors[Donations.education]};
  color: ${colors[Donations.education]};
`;
export const AgricultureTheme = styled.div`
  background: ${colors[Donations.agriculture]};
  border: 2px solid ${colors[Donations.agriculture]};
  color: ${colors[Donations.agriculture]};
`;
export const CharityTheme = styled.div`
  background: ${colors[Donations.charity]};
  border: 2px solid ${colors[Donations.charity]};
  color: ${colors[Donations.charity]};
`;
export const SeasTheme = styled.div`
  background: ${colors[Donations.seas]};
  border: 2px solid ${colors[Donations.seas]};
  color: ${colors[Donations.seas]};
`;
