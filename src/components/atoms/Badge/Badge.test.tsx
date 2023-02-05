import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

test('Badge', () => {
  render(<Badge>Badge</Badge>);
  expect(screen.getByTestId('badge')).toBeInTheDocument();
  expect(screen.getByTestId('badge')).toMatchSnapshot();
});
