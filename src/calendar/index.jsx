import React, { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

import "./style.scss";
import { dateEquals, dateIsToday, getMonthDates, getWeekDates, WEEKDAYS } from "./utils";
import { formatDate, getClassName } from "../utils";

const CalendarCtx = createContext();

const propTypes = {
    view: PropTypes.oneOf(["week", "month"]),
    DateComponent: PropTypes.elementType,
};

export default function Calendar(props) {
    const [view, setView] = useState(props.view || "month");
    const { id, className, ...rest } = props;

    const context = useMemo(() => {
        return { ...rest, view };
    }, [rest, view]);

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
    const dates = getWeekDates(props.curDate);

    return (
        <div className="Week">
            <div className="Dates">
                {dates.map((dt) => {
                    return <DateWrapper {...{ dt }} context={props.context} key={dt.toString()} />;
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

    const isToday = dateIsToday(dt);
    const isCurrent = dateEquals(dt, context.selected);

    const { DateComponent } = context;

    if (DateComponent) return <DateComponent {...props} {...{ isToday, isCurrent }} />;

    const handleDateClick = (e) => {
        const { onDateClick } = context;
        if (!onDateClick) return;

        onDateClick({ event: e, date: dt, isToday });
    };

    return (
        <div
            className={getClassName(["day", isToday && "today", isCurrent && "current"])}
            onClick={handleDateClick}
            role="button"
        >
            {context.view === "week" && (
                <div className="day-weekday">{formatDate(dt, { weekday: "short" })}</div>
            )}
            <div className="day-date">{dt.getDate()}</div>
        </div>
    );
};

DateWrapper.propTypes = {
    dt: PropTypes.instanceOf(Date).isRequired,
    context: PropTypes.object,
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
