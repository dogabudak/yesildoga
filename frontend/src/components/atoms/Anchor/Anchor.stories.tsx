import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import type { AnchorProps } from 'src/components/atoms/Anchor/Anchor';
import { Anchor } from 'src/components/atoms/Anchor/Anchor';

const Template: StoryFn<AnchorProps> = (args) => <Anchor {...args} />;

export default {
  title: 'Atoms/Anchor',
  component: Anchor,
} as Meta;

export const Default = Template.bind({});
Default.args = {
  children: 'Click me',
  href: '#',
};
