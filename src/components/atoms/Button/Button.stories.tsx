import React from 'react';
import type { Meta, Story } from '@storybook/react';
import type { ButtonProps } from './Button';
import { Button } from './Button';

export default {
  title: 'Atoms/Button',
  component: Button,
} as Meta;

const ButtonComponent: Story<ButtonProps> = (args) => <Button {...args} />;

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
