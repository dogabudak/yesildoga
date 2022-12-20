import React from 'react';
import type { Meta, Story } from '@storybook/react';
import type { SelectProps } from './Select';
import { Select } from './Select';

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
