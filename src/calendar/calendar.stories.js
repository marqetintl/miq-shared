import React from "react";

import Calendar from ".";

export default {
    title: "@calendar/Calendar",
    component: Calendar,
    argTypes: {},
};

const Template = (args) => <Calendar {...args} />;

const week = <Calendar.Week />;
export const CalendarWeek = Template.bind({});
CalendarWeek.args = {
    children: [week],
};

const month = <Calendar.Month />;
export const CalendarMonth = Template.bind({});
CalendarMonth.args = {
    children: [month],
};
