import React from 'react';

import Form, { useForm } from '.';

export default {
  title: '@form/form',
  component: Form,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <Form {...args} />;

const input = <Form.TextInput name="title" />;
export const FormS = Template.bind({});
TextareaXpand.args = {
  context: useForm({ title: '' }),
  children: [input],
};
