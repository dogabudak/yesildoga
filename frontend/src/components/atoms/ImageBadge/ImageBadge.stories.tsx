import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import type { ImageBadgeProps } from 'src/components/atoms/ImageBadge/ImageBadge';
import { ImageBadge } from 'src/components/atoms/ImageBadge/ImageBadge';

export default {
  title: 'Atoms/ImageBadge',
  component: ImageBadge,
} as Meta;

const ImageBadgeComponent: StoryFn<ImageBadgeProps> = (args) => <ImageBadge {...args} />;

export const Default = ImageBadgeComponent.bind({});
Default.args = {
  children: 'Story of ImageBadge',
};
