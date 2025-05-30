import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import type { BadgeProps } from 'src/components/atoms/Badge/Badge';
import { Badge } from 'src/components/atoms/Badge/Badge';

export default {
  title: 'Atoms/Badge',
  component: Badge,
} as Meta;

const BadgeComponent: StoryFn<BadgeProps> = (args) => <Badge {...args} />;

export const Default = BadgeComponent.bind({});
Default.args = {
  children: 'Story of Badge',
};
