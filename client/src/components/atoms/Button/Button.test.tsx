import React from 'react';
import { colors } from '@style/colors';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('Button', () => {
  const { rerender, asFragment } = render(<Button>Button</Button>);

  const primaryFragment = asFragment();

  const getButton = () => screen.getByTestId('button');

  expect(getButton()).toHaveStyleRule('background-color', colors.primary);
  expect(getButton()).toBeInTheDocument();
  expect(getButton()).toMatchSnapshot();

  rerender(<Button secondary>Button</Button>);

  expect(getButton()).toHaveStyleRule('background-color', colors.secondary);
  expect(getButton()).toBeInTheDocument();
  expect(primaryFragment).toMatchDiffSnapshot(asFragment());
});
