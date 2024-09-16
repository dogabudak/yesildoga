import { Footer } from './Footer';

export default {
  title: 'Components/Footer',
  component: Footer,
};

const Template = (args) => <Footer {...args} />;

export const DefaultFooter = Template.bind({});
DefaultFooter.args = {};
