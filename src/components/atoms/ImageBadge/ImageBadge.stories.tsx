import React from 'react';
import type { Meta, Story } from '@storybook/react';
import type { ImageBadgeProps } from './ImageBadge';
import { ImageBadge } from './ImageBadge';

export default {
  title: 'Atoms/ImageBadge',
  component: ImageBadge,
} as Meta;

const ImageBadgeComponent: Story<ImageBadgeProps> = (args) => <ImageBadge {...args} />;

export const Default = ImageBadgeComponent.bind({});
Default.args = {
  children: 'Story of ImageBadge',
};
