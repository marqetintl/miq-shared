import isDate from 'lodash.isdate';

export const formatDate = (
  date,
  format = { weekday: 'short', month: 'long', day: 'numeric' },
  locale = new Intl.NumberFormat().resolvedOptions().locale || 'en-US'
) => {
  const date_time = new Intl.DateTimeFormat(locale, {
    ...format,
    //    weekday: "short",
    //    month: "long",
    //    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // year: 'numeric',
  });
  return date_time.format(new Date(date));
};

export const formatDateToStr = (date) => {
  if (!isDate(date)) return '';

  var dd = date.getDate();
  var mm = date.getMonth() + 1; //January is 0!
  var yyyy = date.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }

  return yyyy + '-' + mm + '-' + dd;
};

export const formatTime = (
  date,
  format = { hour: 'numeric', minute: 'numeric' },
  locale = new Intl.NumberFormat().resolvedOptions().locale
) => {
  const date_time = new Intl.DateTimeFormat(locale, { ...format });
  return date_time.format(new Date(date));
};
