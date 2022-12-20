import React from 'react';
import type { Meta, Story } from '@storybook/react';
import type { TextProps } from './Text';
import { Text } from './Text';

export default {
  title: 'Atoms/Text',
  component: Text,
} as Meta;

const TextComponent: Story<TextProps> = (args) => <Text {...args} />;

export const Default = TextComponent.bind({});
Default.args = {
  children: 'An awesome Text Story',
  weight: 400,
  style: 'regular',
};
