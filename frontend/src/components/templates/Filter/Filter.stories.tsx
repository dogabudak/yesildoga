import React from 'react';
import type { Meta, Story } from '@storybook/react';
import type { FilterBarProps } from 'src/components/templates/Filter/Filter';
import { Filter } from 'src/components/templates/Filter/Filter';

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

Default.parameters = {
  backgrounds: {
    default: 'dark',
  },
};
