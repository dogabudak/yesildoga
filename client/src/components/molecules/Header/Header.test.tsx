import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';

test('Header', () => {
  const { asFragment } = render(<Header />);

  const getHeader = () => screen.getByTestId('header');
  const getHamburger = () => screen.getByTestId('header-hamburger');

  const closedFragment = asFragment();

  expect(getHeader()).toBeInTheDocument();
  expect(getHeader()).toMatchSnapshot('closed');

  userEvent.click(getHamburger());

  expect(closedFragment).toMatchDiffSnapshot(asFragment());
});
