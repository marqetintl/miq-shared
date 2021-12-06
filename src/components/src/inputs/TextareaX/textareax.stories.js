import React from "react";

import TextareaX from ".";

export default {
    title: "Components/TextareaX",
    component: TextareaX,
    argTypes: {
        backgroundColor: { control: "color" },
    },
};

const Template = (args) => <TextareaX {...args} />;

export const TextareaXpand = Template.bind({});
TextareaXpand.args = {};
