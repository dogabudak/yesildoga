import React from 'react';
import type { Meta, Story } from '@storybook/react';
import type { AnchorProps } from 'src/components/atoms/Anchor/Anchor';
import { Anchor } from 'src/components/atoms/Anchor/Anchor';

export default {
  title: 'Atoms/Anchor',
  component: Anchor,
} as Meta;

const AnchorComponent: Story<AnchorProps> = (args) => <Anchor {...args} />;

export const Default = AnchorComponent.bind({});
Default.args = {
  children: 'Click me',
  href: '#',
};
