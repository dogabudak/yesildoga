---
to: <%= path_from_root %>.test.tsx
---

import React from 'react';
import { render, screen } from '@testing-library/react';
import { <%= name %> } from './<%= name%>';

test('<%= name %>', () => {
  render(<<%= name %>><%= name %></<%= name %>>);
  expect(screen.getByText('<%= name %>')).toHaveStyleRule('position', 'static');
  expect(screen.getByText('<%= name %>')).toBeInTheDocument();
  expect(screen.getByText('<%= name %>')).toMatchSnapshot();
});
