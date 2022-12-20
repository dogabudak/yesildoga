/**
 * MEDIA QUERY FUNCTIONS
 */

import type { FlattenSimpleInterpolation } from 'styled-components';
import { css } from 'styled-components';
import { breakpoints } from '../../breakpoints';

type QueryCheck = {
  minHeight?: number;
  maxHeight?: number;
  minWidth?: number;
  maxWidth?: number;
};

const createQueryCheck = ({ minHeight, minWidth, maxWidth, maxHeight }: QueryCheck): string => {
  const checks: Array<string> = [];

  if (minHeight) {
    checks.push(`(min-height: ${minHeight}px)`);
  }

  if (minWidth) {
    checks.push(`(min-width: ${minWidth}px)`);
  }

  if (maxHeight) {
    checks.push(`(max-height: ${maxHeight}px)`);
  }

  if (maxWidth) {
    checks.push(`(max-width: ${maxWidth}px)`);
  }

  return checks.join(' and ');
};

type MediaQuery = (styles: FlattenSimpleInterpolation) => FlattenSimpleInterpolation;

const createMediaQuery = (items: QueryCheck[]): MediaQuery => {
  const checkParams = items.map((query) => createQueryCheck(query)).join(', ');

  return (styles: FlattenSimpleInterpolation) => css`
    @media ${checkParams} {
      ${styles}
    }
  `;
};

export const untilMobile = createMediaQuery([
  {
    maxWidth: breakpoints.mobile.max,
  },
]);

export const untilTablet = createMediaQuery([
  {
    maxWidth: breakpoints.tablet.max,
  },
]);

export const fromTablet = createMediaQuery([
  {
    minWidth: breakpoints.tablet.min,
  },
]);

export const onlyTablet = createMediaQuery([
  {
    minWidth: breakpoints.tablet.min,
    maxWidth: breakpoints.tablet.max,
  },
]);

export const fromDesktop = createMediaQuery([
  {
    minWidth: breakpoints.desktop.min,
  },
]);

export const queries: Record<string, MediaQuery> = {
  untilMobile,
  untilTablet,
  fromTablet,
  onlyTablet,
  fromDesktop,
};
