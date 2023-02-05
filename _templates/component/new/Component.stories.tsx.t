---
to: <%= path_from_root %>.stories.tsx
---
import React from 'react';
import type { Meta, Story } from '@storybook/react';
import type { <%= name %>Props } from './<%= name %>';
import { <%= name %> } from './<%= name %>';

export default {
  title: '<%= h.inflection.pluralize(type) %>/<%= name %>',
  component: <%= name %>,
} as Meta;

const <%= name%>Component: Story<<%= name %>Props> = (args) => <<%= name %> {...args} />;

export const Default = <%= name %>Component.bind({});
Default.args = {
  children: 'Story of <%= name %>',
};
