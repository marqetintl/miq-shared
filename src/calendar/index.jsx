import React, { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

import "./style.scss";
import { getMonthDates, getWeekDates, WEEKDAYS } from "./utils";
import { getClassName } from "../utils";

const CalendarCtx = createContext();

const propTypes = {
    view: PropTypes.oneOf(["week", "month"]),
};

export default function Calendar(props) {
    const [view, setView] = useState(props.view || "month");
    const { id, className, ...rest } = props;

    const context = useMemo(() => {
        return { ...rest };
    }, [rest]);

    let Component = Month;
    switch (view) {
        case "week":
            Component = Week;
            break;

        default:
            Component = Month;
            break;
    }

    return (
        <CalendarCtx.Provider value={context}>
            <div id={id} className={getClassName(["miq-calendar", className])}>
                <div className="Toolbar">
                    <select
                        name="view"
                        value={view}
                        onChange={({ target }) => {
                            setView(target.value);
                        }}
                    >
                        <option value={"month"}>Month</option>
                        <option value={"week"}>Week</option>
                    </select>
                </div>

                <Component view={view} context={context} />
            </div>
        </CalendarCtx.Provider>
    );
}

Calendar.propTypes = propTypes;

const Month = (props) => {
    const { datesByWeek = [] } = getMonthDates();

    return (
        <div className="Month">
            <Weekdays context={props.context} />

            <div className="Weeks">
                {datesByWeek.map((week) => (
                    <Week curDate={week[0]} context={props.context} key={week[0].toString()} />
                ))}
            </div>
        </div>
    );
};

Month.propTypes = {
    view: PropTypes.string,
    curDate: PropTypes.instanceOf(Date),
    context: PropTypes.object.isRequired,
};

const Week = (props) => {
    const { curDate, view = "month" } = props;
    const dates = getWeekDates(curDate);

    return (
        <div className="Week">
            {view === "week" && <Weekdays context={props.context} />}

            <div className="Dates">
                {dates.map((dt) => {
                    return <DateWrapper dt={dt} context={props.context} key={dt.toString()} />;
                })}
            </div>
        </div>
    );
};

Week.propTypes = {
    view: PropTypes.string,
    curDate: PropTypes.instanceOf(Date),
    context: PropTypes.object.isRequired,
};

const DateWrapper = (props) => {
    const { dt, context = {} } = props;

    const handleDateClick = (e) => {
        const { onDateClick } = context;
        if (!onDateClick) return;

        onDateClick({ event: e, date: dt });
    };

    return (
        <div className="Date" onClick={handleDateClick}>
            {dt.getDate()}
        </div>
    );
};

DateWrapper.propTypes = {
    dt: PropTypes.instanceOf(Date).isRequired,
};

const Weekdays = (prop) => {
    return (
        <div className="Weekdays">
            {WEEKDAYS.map((day) => {
                return (
                    <div className="Weekday" key={day.index}>
                        {day[`short`]}
                    </div>
                );
            })}
        </div>
    );
};
