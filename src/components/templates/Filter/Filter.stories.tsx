import React from 'react';
import type { Meta, Story } from '@storybook/react';
// import filters from '../../../mockdata/filters.json';
import type { FilterBarProps } from './Filter';
import { Filter } from './Filter';

export default {
  title: 'Templates/Filter',
  component: Filter,
} as Meta;

const FilterComponent: Story<FilterBarProps> = (args) => (
  <div style={{ width: 300 }}>
    {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
    <Filter filters={args.filters} queryFilters={{}} onSubmit={() => {}} />
  </div>
);

export const Default = FilterComponent.bind({});
/*
Default.args = {
  filters,
};
 */

Default.parameters = {
  backgrounds: {
    default: 'dark',
  },
};
