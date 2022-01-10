import isDate from 'lodash.isdate';
import { formatDateToStr } from '@miq/utils';

export const dateIsToday = (date) => dateEquals(date, new Date());

export const dateEquals = (date1, date2) => {
  if (!isDate(date1) || !isDate(date2)) return false;
  return formatDateToStr(date1) === formatDateToStr(date2);
};

export const getMonthDates = (curDate) => {
  if (!isValidDate(curDate)) {
    curDate = new Date(); // Today
  }

  const curYear = curDate.getFullYear();
  const curMonth = curDate.getMonth();

  const firstDate = new Date(curYear, curMonth, 1);
  const lastDate = new Date(curYear, curMonth + 1, 0);
  let datesByWeek = [];

  let nextDate = new Date(firstDate);
  for (let i = 0; nextDate.getMonth() === curMonth && nextDate.getFullYear() === curYear; i = i + 7) {
    nextDate = new Date(firstDate);
    nextDate.setDate(firstDate.getDate() + i);
    const week = getWeekDates(nextDate);

    if (week.firstDate > lastDate) {
      break;
    }

    datesByWeek = [...datesByWeek, week];
  }

  return { weeks: datesByWeek, firstDate, lastDate };
};

export const getWeekDates = (currDate) => {
  if (!isValidDate(currDate)) {
    currDate = new Date(); // Today
  }

  const offset = currDate.getDate() - currDate.getDay();
  const firstDate = new Date(currDate);
  firstDate.setDate(offset);

  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(firstDate);
    const nextDate = firstDate.getDate() + i;
    date.setDate(nextDate);
    dates.push(date);
  }
  return { dates: [...dates], firstDate, lastDate: dates.slice(-1)[0] };
};

export const isValidDate = (date) => date && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date);

export const WEEKDAYS = [
  { short: 'Sun', long: 'Sunday' },
  { short: 'Mon', long: 'Monday' },
  { short: 'Tue', long: 'Tuesday' },
  { short: 'Wed', long: 'Wednesday' },
  { short: 'Thu', long: 'Thursday' },
  { short: 'Fri', long: 'Friday' },
  { short: 'Sat', long: 'Saturday' },
].map((d, i) => ({ ...d, index: i }));
