import React from 'react';
import type { Meta, Story } from '@storybook/react';
import type { StatusProps } from './Status';
import { Status } from './Status';

export default {
  title: 'Atoms/Status',
  component: Status,
} as Meta;

const StatusComponent: Story<StatusProps> = (args) => <Status {...args} />;

export const Default = StatusComponent.bind({});
Default.args = {
  children: 'Story of Status',
};
