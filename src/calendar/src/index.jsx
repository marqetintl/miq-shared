import React, { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

import "./style.scss";
import { formatDate, getClassName, isRequired } from "@miq/utils";

import { dateEquals, dateIsToday, getMonthDates, getWeekDates, WEEKDAYS } from "./utils";
import { useContext } from "react";
import { isDate } from "lodash";

/**
 *
 * CALENDAR CONTEXT
 *
 */

export const CalendarCtx = createContext();

/**
 *
 * DATE WRAPPER COMPONENT
 *
 */

const DateWrapper = (props) => {
    const { view, dt, context = {} } = props;

    // console.log(context);

    const isToday = dateIsToday(dt);
    const isCurrent = dateEquals(dt, context.selected);

    const DateComponent = props.DateComponent || context.DateComponent;

    if (DateComponent) return <DateComponent {...props} {...{ view, isToday, isCurrent }} />;

    const handleDateClick = (e) => {
        const { onDateClick } = context;
        if (!onDateClick) return;

        onDateClick({ event: e, date: dt, view, isToday, isCurrent });
    };

    return (
        <div
            className={getClassName(["day", isToday && "today", isCurrent && "current"])}
            onClick={handleDateClick}
            role="button"
        >
            {view === "week" && (
                <div className="day-weekday">{formatDate(dt, { weekday: "short" })}</div>
            )}
            <div className="day-date">{dt.getDate()}</div>
        </div>
    );
};

DateWrapper.propTypes = {
    view: PropTypes.string.isRequired,
    dt: PropTypes.instanceOf(Date).isRequired,
    context: PropTypes.object.isRequired,
};

/**
 *
 * WEEK COMPONENT
 *
 */

const Week = (props) => {
    const view = props.view || "week";

    const context = useContext(CalendarCtx);
    const curWeek = props.curWeek || context.curWeek;

    if (!curWeek.dates) return null;

    return (
        <div className="Week">
            <div className="Dates">
                {curWeek.dates.map((dt) => {
                    return (
                        <DateWrapper {...props} {...{ dt, view, context }} key={dt.toString()} />
                    );
                })}
            </div>
        </div>
    );
};

Week.propTypes = {
    view: PropTypes.string,
    curWeek: PropTypes.object,
};

/**
 *
 * MONTH COMPONENT
 *
 */

const Month = (props) => {
    const view = "month";
    const { curMonth = {} } = useContext(CalendarCtx);

    if (!curMonth.weeks) return null;

    return (
        <div className="Month">
            <Weekdays {...props} {...{ view, curMonth }} />

            <div className="Weeks">
                {curMonth.weeks.map((week) => (
                    <Week {...props} {...{ view }} curWeek={week} key={week.dates[0].toString()} />
                ))}
            </div>
        </div>
    );
};

Month.propTypes = {
    view: PropTypes.string,
    curDate: PropTypes.instanceOf(Date),
    // context: PropTypes.object.isRequired,
};

/**
 * DATEPICKER
 */

const DatePickerToggler = (props) => {
    const { renderToggler, TogglerComponent, ...rest } = props;

    if (renderToggler) {
        return renderToggler(rest);
    }
    if (TogglerComponent) {
        return <TogglerComponent {...rest} />;
    }
    return null;
};

const DatePickerFooter = (props) => {
    const { renderFooter, FooterComponent, ...rest } = props;

    if (renderFooter) {
        return renderFooter(rest);
    }
    if (FooterComponent) {
        return <FooterComponent {...rest} />;
    }
    return null;
};

const DatePicker = (props) => {
    const { showBody = true } = props;
    const hasToggler = props.renderToggler || props.TogglerComponent;
    const hasFooter = props.renderFooter || props.FooterComponent;
    const [show, setShow] = useState(showBody);

    return (
        <div className="miq-datepicker">
            {hasToggler && (
                <div className="miq-datepicker-header">
                    <DatePickerToggler {...props} {...{ show, setShow }} />
                </div>
            )}

            {show && (
                <>
                    <div className="miq-datepicker-body">
                        <div className="miq-datepicker-content">
                            <div className="miq-datepicker-toolbar">
                                <Calendar.Prev view="month" />
                                <Calendar.Title view="month" />
                                <Calendar.Next view="month" />
                            </div>
                            <div className="miq-datepicker-month">
                                <Calendar.Month />
                            </div>

                            {hasFooter && (
                                <div className="miq-datepicker-footer">
                                    <DatePickerFooter {...props} {...{ show, setShow }} />
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

DatePicker.propTypes = {
    // toggler
    // showBody
    // renderToggler TogglerComponent renderFooter FooterComponent
};

/**
 *
 * WEEKDAYS COMPONENT
 *
 */

const Weekdays = (props) => (
    <div id={props.id} className="Weekdays">
        {WEEKDAYS.map((day) => {
            return (
                <div className="Weekday" key={day.index}>
                    {day[`short`]}
                </div>
            );
        })}
    </div>
);

/**
 *
 * CALENDAR TOOLBAR COMPONENTS
 *
 */

const PrevButton = (props) => {
    const { goPrevWeek, goPrevMonth } = useContext(CalendarCtx);
    const { view = isRequired("view") } = props;

    const goPrev = view === "week" ? goPrevWeek : goPrevMonth;

    return (
        <button className="btn icon-btn btn-prev" onClick={goPrev}>
            <ChevronLeft className="icon" />
        </button>
    );
};

const NextButton = (props) => {
    const { goNextWeek, goNextMonth } = useContext(CalendarCtx);
    const { view = isRequired("view") } = props;

    const goNext = view === "week" ? goNextWeek : goNextMonth;

    return (
        <button className="btn icon-btn btn-next" onClick={goNext}>
            <ChevronRight className="icon" />
        </button>
    );
};

const Title = (props) => {
    const { curDate, curWeek } = useContext(CalendarCtx);
    const { view = isRequired("view") } = props;

    if (!isDate(curDate)) return null;

    let format = { month: "long", year: "numeric" };
    let comp;

    switch (view) {
        case "week":
            const { firstDate, lastDate } = curWeek;
            format = { day: "numeric", month: "short" };
            comp = (
                <>
                    {isDate(firstDate) && <span>{formatDate(firstDate, format)}</span>}
                    {isDate(lastDate) && (
                        <span>
                            {" - "}
                            {formatDate(lastDate, { ...format, year: "numeric" })}
                        </span>
                    )}
                </>
            );
            break;

        default:
            comp = formatDate(curDate, format);
            break;
    }

    return <div className="Title">{comp}</div>;
};

const Toolbar = (props) => {
    const { context = isRequired("Calendar context") } = props;

    return (
        <div className="Toolbar">
            <select
                name="view"
                value={context.view}
                onChange={({ target }) => {
                    context.setView(target.value);
                }}
            >
                <option value={"month"}>Month</option>
                <option value={"week"}>Week</option>
            </select>
        </div>
    );
};

/**
 *
 * CALENDAR COMPONENT
 *
 */

export default function Calendar({ children, ...props }) {
    const initialDate = isDate(props.initialDate) ? initialDate : new Date();
    const [curDate, setCurDate] = useState(initialDate);
    const { id, className, ...handlers } = props;
    const { onWeekChange, onMonthChange, ...rest } = handlers;

    const context = useMemo(() => {
        const goPrevMonth = () => {
            if (!isDate(curDate)) return;
            const dt = new Date(curDate.setMonth(curDate.getMonth() - 1));
            setCurDate(dt);

            if (onMonthChange) {
                onMonthChange({ dt });
            }
        };

        const goNextMonth = () => {
            if (!isDate(curDate)) return;
            const dt = new Date(curDate.setMonth(curDate.getMonth() + 1));
            setCurDate(dt);

            if (onMonthChange) {
                onMonthChange({ dt });
            }
        };

        const goPrevWeek = () => {
            if (!isDate(curDate)) return;

            const dt = new Date(curDate.setDate(curDate.getDate() - 7));
            setCurDate(dt);

            if (onWeekChange) {
                onWeekChange({ dt });
            }

            // Todo: On month change
        };

        const goNextWeek = () => {
            if (!isDate(curDate)) return;

            const dt = new Date(curDate.setDate(curDate.getDate() + 7));
            setCurDate(dt);

            if (onWeekChange) {
                onWeekChange({ dt });
            }
        };

        const goToday = () => {
            setCurDate(new Date());
        };

        return {
            ...rest,
            curDate,
            setCurDate,
            initialDate,
            curWeek: getWeekDates(curDate),
            curMonth: getMonthDates(curDate),
            goToday,
            goPrevWeek,
            goNextWeek,
            goPrevMonth,
            goNextMonth,
        };
    }, [rest, curDate, setCurDate, initialDate]);

    return (
        <CalendarCtx.Provider value={context}>
            <div id={id} className={getClassName(["miq-calendar", className])}>
                {children}
            </div>
        </CalendarCtx.Provider>
    );
}

// ToolBar
Calendar.Title = Title;
Calendar.Prev = PrevButton;
Calendar.Next = NextButton;
Calendar.Toolbar = Toolbar;

// Datepicker

Calendar.DatePicker = DatePicker;
Calendar.Week = Week;
Calendar.Weekdays = Weekdays;
Calendar.Month = Month;

Calendar.propTypes = {
    initialDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    DateComponent: PropTypes.elementType,
    onWeekChange: PropTypes.func,
    onMonthChange: PropTypes.func,
};
