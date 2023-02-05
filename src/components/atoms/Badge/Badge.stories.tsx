import React from 'react';
import type { Meta, Story } from '@storybook/react';
import type { BadgeProps } from './Badge';
import { Badge } from './Badge';

export default {
  title: 'Atoms/Badge',
  component: Badge,
} as Meta;

const BadgeComponent: Story<BadgeProps> = (args) => <Badge {...args} />;

export const Default = BadgeComponent.bind({});
Default.args = {
  children: 'Story of Badge',
};
