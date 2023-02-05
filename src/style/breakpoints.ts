/**
 * BREAKPOINT VARIABLES
 *
 * - Mobile
 * - Tablet
 * - Desktop
 *
 * - values are in pixel
 */

const mobile = {
  max: 539,
};

const tablet = {
  min: mobile.max + 1, // 540
  max: 1223,
};

const desktop = {
  min: tablet.max + 1, // 1224
};

export const breakpoints = {
  mobile,
  tablet,
  desktop,
};
