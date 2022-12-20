import React from 'react';
import { render, screen } from '@testing-library/react';
import { ImageBadge } from './ImageBadge';

test('ImageBadge', () => {
  render(<ImageBadge>ImageBadge</ImageBadge>);
  expect(screen.getByTestId('imagebadge')).toBeInTheDocument();
  expect(screen.getByTestId('imagebadge')).toMatchSnapshot();
});
