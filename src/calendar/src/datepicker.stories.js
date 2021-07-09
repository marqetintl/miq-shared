import React from "react";

import Calendar from ".";

export default {
    title: "@calendar/Datepicker",
    component: Calendar.DatePicker,
    argTypes: {},
};

const Template = (args) => <Calendar {...args} />;

const dp = <Calendar.DatePicker />;

export const DatePicker = Template.bind({});
DatePicker.args = {
    children: [dp],
};
