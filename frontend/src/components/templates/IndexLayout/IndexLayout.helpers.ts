import { DonationBackgroundPath, Donations } from 'src/types/Donations';
import { colors } from 'src/style/colors';

export const tabData = [
  {
    name: Donations.forest,
    backgroundImage: DonationBackgroundPath.forest,
    accentColor: colors[Donations.forest],
    title: 'Forests',
    description: 'Preserve and restore the green lungs of our planet through reforestation projects.',
  },
  {
    name: Donations.seas,
    backgroundImage: DonationBackgroundPath.seas,
    accentColor: colors[Donations.seas],
    title: 'Seas & Oceans',
    description: 'Protect marine ecosystems and fight ocean pollution with cleanup initiatives.',
  },
  {
    name: Donations.agriculture,
    backgroundImage: DonationBackgroundPath.agriculture,
    accentColor: colors[Donations.agriculture],
    title: 'Agriculture',
    description: 'Support sustainable farming that feeds communities without harming the earth.',
  },
  {
    name: Donations.education,
    backgroundImage: DonationBackgroundPath.education,
    accentColor: colors[Donations.education],
    title: 'Education',
    description: 'Give every child a fair chance to learn, grow, and build a better future.',
  },
  {
    name: Donations.charity,
    backgroundImage: DonationBackgroundPath.charity,
    accentColor: colors[Donations.charity],
    title: 'Charity',
    description: 'Direct support for people and communities when they need it most.',
  },
];
