import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Header } from 'src/components/molecules/Header/Header';

export default {
  title: 'Molecules/Header',
  component: Header,
} as Meta;

const HeaderComponent: StoryFn = (args) => <Header {...args} />;

export const Default = HeaderComponent.bind({});
Default.args = {
  children: 'Story of Header',
};

Default.parameters = {
  backgrounds: { default: 'dark' },
};
