import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import type { ButtonProps } from 'src/components/atoms/Button/Button';
import { Button } from 'src/components/atoms/Button/Button';

export default {
  title: 'Atoms/Button',
  component: Button,
} as Meta;

const ButtonComponent: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Primary = ButtonComponent.bind({});
export const Secondary = ButtonComponent.bind({});
Primary.args = {
  children: 'Click me',
  secondary: false,
};

Secondary.args = {
  children: 'Click me',
  secondary: true,
};
