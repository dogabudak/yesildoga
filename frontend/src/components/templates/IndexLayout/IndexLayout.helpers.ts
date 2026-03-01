import { DonationBackgroundPath, Donations } from 'src/types/Donations';

export const tabData = [
  {
    name: Donations.agriculture,
    gradientColors: { start: 'rgba(50, 100, 0, 0.7)', end: 'rgba(50, 100, 0, 0.7)' },
    backgroundImage: DonationBackgroundPath.agriculture,
    title: Donations.agriculture,
    description: 'Support sustainable farming and help communities thrive.',
  },
  {
    name: Donations.education,
    gradientColors: { start: 'rgba(0, 0, 100, 0.7)', end: 'rgba(0, 0, 100, 0.7)' },
    backgroundImage: DonationBackgroundPath.education,
    title: Donations.education,
    description: 'Empower the next generation through education.',
  },
  {
    name: Donations.charity,
    gradientColors: { start: 'rgba(100, 0, 0, 0.7)', end: 'rgba(100, 0, 0, 0.7)' },
    backgroundImage: DonationBackgroundPath.charity,
    title: Donations.charity,
    description: 'Make a difference by supporting those in need.',
  },
  {
    name: Donations.seas,
    gradientColors: { start: 'rgba(0, 50, 100, 0.7)', end: 'rgba(0, 50, 100, 0.7)' },
    backgroundImage: DonationBackgroundPath.seas,
    title: Donations.seas,
    description: 'Protect our oceans and marine life.',
  },
  {
    name: Donations.forest,
    gradientColors: { start: 'rgba(0, 50, 0, 0.7)', end: 'rgba(0, 50, 0, 0.7)' },
    backgroundImage: DonationBackgroundPath.forest,
    title: Donations.forest,
    description: 'Preserve our forests for future generations.',
  },
];
