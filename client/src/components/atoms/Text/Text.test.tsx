import React from 'react';
import { render, screen } from '@testing-library/react';
import { Text } from './Text';

test('Text', () => {
  render(<Text>Text</Text>);
  expect(screen.getByText('Text')).toHaveStyleRule('font-style', 'regular');
  expect(screen.getByText('Text')).toHaveStyleRule('font-weight', '400');
  expect(screen.getByText('Text')).toBeInTheDocument();
  expect(screen.getByText('Text')).toMatchSnapshot('text-regular-400');
});
