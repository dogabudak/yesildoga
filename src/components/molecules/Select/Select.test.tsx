import React from 'react';
import { render, screen } from '@testing-library/react';
import { Select } from './Select';

test('Select', () => {
  const { asFragment, rerender } = render(
    <Select onChange={jest.fn} localizedName='Test' name='test' options={['a', 'b']} />
  );

  const preFragment = asFragment();

  const getSelect = () => screen.getByTestId('select');
  const getValue = (value: string) => screen.getByRole('option', { name: value });

  expect(getSelect()).toBeInTheDocument();
  expect(getSelect()).toMatchSnapshot();

  expect(getValue('a')).toBeInTheDocument();
  expect(getValue('b')).toBeInTheDocument();
  expect(screen.queryByText('Test auswählen')).not.toBeInTheDocument();

  rerender(<Select onChange={jest.fn} localizedName='Test' name='test' options={['']} initField />);

  expect(screen.getByText('Test auswählen')).toBeInTheDocument();
  expect(preFragment).toMatchDiffSnapshot(asFragment());
});
