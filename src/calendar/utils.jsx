export const getMonthDates = (curDate) => {
    if (!isValidDate(curDate)) {
        curDate = new Date(); // Today
    }

    const curYear = curDate.getFullYear();
    const curMonth = curDate.getMonth();

    const fDate = new Date(curYear, curMonth, 1);
    let datesByWeek = [];

    let nextDate = new Date(fDate);
    for (
        let i = 0;
        nextDate.getMonth() === curMonth && nextDate.getFullYear() === curYear && i < 32;
        i = i + 7
    ) {
        nextDate = new Date(fDate);
        nextDate.setDate(fDate.getDate() + i);

        console.log(i, nextDate.getMonth());

        datesByWeek = [...datesByWeek, getWeekDates(nextDate)];
    }

    return { datesByWeek };
};

export const getWeekDates = (currDate) => {
    if (!isValidDate(currDate)) {
        currDate = new Date(); // Today
    }

    const offset = currDate.getDate() - currDate.getDay();
    const fDate = new Date(currDate);
    fDate.setDate(offset);

    const dates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(fDate);
        const nextDate = fDate.getDate() + i;
        date.setDate(nextDate);
        dates.push(date);
    }
    return [...dates];
};

export const isValidDate = (date) =>
    date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);

export const WEEKDAYS = [
    { short: "Sun", long: "Sunday" },
    { short: "Mon", long: "Monday" },
    { short: "Tue", long: "Tuesday" },
    { short: "Wed", long: "Wednesday" },
    { short: "Thu", long: "Thursday" },
    { short: "Fri", long: "Friday" },
    { short: "Sat", long: "Saturday" },
].map((d, i) => ({ ...d, index: i }));