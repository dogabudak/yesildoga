import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import type { TextProps } from 'src/components/atoms/Text/Text';
import { Text } from 'src/components/atoms/Text/Text';

export default {
  title: 'Atoms/Text',
  component: Text,
} as Meta;

const TextComponent: StoryFn<TextProps> = (args) => <Text {...args} />;

export const Default = TextComponent.bind({});
Default.args = {
  children: 'An awesome Text Story',
  weight: 400,
  style: 'regular',
};
