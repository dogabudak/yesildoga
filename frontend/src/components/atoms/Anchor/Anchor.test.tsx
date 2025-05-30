import React from 'react';
import { render, screen } from '@testing-library/react';
import { Anchor } from 'src/components/atoms/Anchor/Anchor';

test('Anchor', () => {
  render(<Anchor href='test'>Anchor</Anchor>);
  expect(screen.getByText('Anchor')).toBeInTheDocument();
  expect(screen.getByText('Anchor')).toMatchSnapshot();
});
