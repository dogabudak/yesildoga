import styled from 'styled-components';
import { DonationBackgroundPath, Donations } from '@type/Donations';
import { colors } from '@style/colors';

export const ForestTheme = styled.div`
  background: ${colors[Donations.agriculture]} url(${DonationBackgroundPath.forest}) no-repeat
    center center;
  border: 2px solid ${colors[Donations.forest]};
  color: ${colors[Donations.forest]};
  height: 100%; /* Or a specific value, e.g., height: 500px; */
  padding: 20px;
  width: 100%;
`;
export const EducationTheme = styled.div`
  background: ${colors[Donations.education]} url(${DonationBackgroundPath.education}) no-repeat
    center center;
  border: 2px solid ${colors[Donations.education]};
  color: ${colors[Donations.education]};
  height: 100%; /* Or a specific value, e.g., height: 500px; */
  padding: 20px;
  width: 100%;
`;
export const AgricultureTheme = styled.div`
  background: ${colors[Donations.agriculture]} url(${DonationBackgroundPath.agriculture}) no-repeat
    center center;
  border: 2px solid ${colors[Donations.agriculture]};
  color: ${colors[Donations.agriculture]};
  height: 100%; /* Or a specific value, e.g., height: 500px; */
  padding: 20px;
  width: 100%;
`;
export const CharityTheme = styled.div`
  background: ${colors[Donations.charity]} url(${DonationBackgroundPath.charity}) no-repeat center
    center;
  border: 2px solid ${colors[Donations.charity]};
  color: ${colors[Donations.charity]};
  height: 100%; /* Or a specific value, e.g., height: 500px; */
  padding: 20px;
  width: 100%;
`;
//TODO this image is not so nice in tab
export const SeasTheme = styled.div`
  background: ${colors[Donations.seas]} url(${DonationBackgroundPath.seas}) no-repeat center center;
  border: 2px solid ${colors[Donations.seas]};
  color: ${colors[Donations.seas]};
  height: 100%; /* Or a specific value, e.g., height: 500px; */
  padding: 20px;
  width: 100%;
`;
