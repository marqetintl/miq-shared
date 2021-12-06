import React from "react";

import { MasonryColumn } from ".";

export default {
    title: "@components/MasonryColumn",
    component: MasonryColumn,
    argTypes: {},
};

const Template = (args) => <MasonryColumn {...args} />;

const imgs = (
    <>
        <img src="https://cdn.pixabay.com/photo/2021/06/20/16/57/woman-6351539_1280.jpg" />
        <img src="https://cdn.pixabay.com/photo/2021/06/20/16/57/woman-6351539_1280.jpg" />
        <img src="https://cdn.pixabay.com/photo/2020/03/11/15/16/friends-4922436_1280.jpg" />
        <img src="https://cdn.pixabay.com/photo/2020/03/11/15/16/friends-4922436_1280.jpg" />
        <img src="https://cdn.pixabay.com/photo/2021/06/20/16/57/woman-6351539_1280.jpg" />
        <img src="https://cdn.pixabay.com/photo/2021/04/05/14/55/mosque-6153752_1280.jpg" />
    </>
);
export const MasonryColumnImages = Template.bind({});
MasonryColumnImages.args = {
    children: imgs,
};

const txt = (
    <>
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci vel iste id a modi praesentium saepe quia
            consectetur inventore. Sunt a incidunt reiciendis sapiente aspernatur optio earum! Doloremque, cumque non.
        </div>
        <div>Adipisci vel iste id a modi praesentium saepe quia consectetur inventore.</div>
        <div>Sunt a incidunt reiciendis sapiente aspernatur optio earum! Doloremque, cumque non.</div>
    </>
);
export const MasonryColumnText = Template.bind({});
MasonryColumnText.args = {
    children: txt,
};
