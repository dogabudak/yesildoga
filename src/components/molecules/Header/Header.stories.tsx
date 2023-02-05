import React from 'react';
import type { Meta, Story } from '@storybook/react';
import { Header } from './Header';

export default {
  title: 'Molecules/Header',
  component: Header,
} as Meta;

const HeaderComponent: Story = (args) => <Header {...args} />;

export const Default = HeaderComponent.bind({});
Default.args = {
  children: 'Story of Header',
};

Default.parameters = {
  backgrounds: { default: 'dark' },
};
