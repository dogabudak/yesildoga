import React from 'react';
import type { Meta, Story } from '@storybook/react';
import type { SelectProps } from 'src/components/molecules/Select/Select';
import { Select } from 'src/components/molecules/Select/Select';

export default {
  title: 'Molecules/Select',
  component: Select,
} as Meta;

const SelectComponent: Story<SelectProps> = (args) => <Select {...args} />;

export const Default = SelectComponent.bind({});
Default.args = {
  options: ['a', 'b'],
  name: 'Buchstaben',
  initField: true,
};
