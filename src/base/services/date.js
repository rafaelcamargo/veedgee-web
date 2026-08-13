const _public = {};

_public.getNow = () => new Date();

_public.format = (dateString, { locale }) => {
  const { formatLocalizedDateString } = buildLocaleBasedDateProps(locale);
  const result =  new Intl
    .DateTimeFormat(locale, getDateDefaultOptions())
    .format(buildDateFromString(dateString));
  return formatLocalizedDateString(result);
};

_public.formatTime = (timeString, { locale }) => {
  const { timeFormatOptions } = buildLocaleBasedDateProps(locale);
  return new Intl
    .DateTimeFormat(locale, timeFormatOptions)
    .format(buildDateFromTimeString(timeString));
};

_public.isToday = dateString => {
  const today = clearTime(_public.getNow());
  return isSameDay(today, buildDateFromString(dateString));
};

_public.getTodayISOString = () => {
  return _public.buildISOString(clearTime(_public.getNow()));
};

_public.isTomorrow = dateString => {
  const ONE_DAY = 86400000;
  const tomorrow = new Date(clearTime(_public.getNow()).getTime() + ONE_DAY);
  return isSameDay(tomorrow, buildDateFromString(dateString));
};

_public.buildISOString = dateObj => dateObj.toISOString().split('T')[0];

function clearTime(dateObj){
  dateObj.setHours(0, 0, 0);
  return dateObj;
}

function isSameDay(comparingDate, comparedDate){
  return _public.buildISOString(comparingDate) === _public.buildISOString(comparedDate);
}

function buildDateFromString(dateString){
  const [year, month, day] = dateString.split('-').map(num => parseInt(num));
  return new Date(year, month-1, day);
}

function buildDateFromTimeString(timeString){
  const [hours, minutes] = timeString.split(':').map(num => parseInt(num));
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
}

function formatNonAmericanDateString(localeTimeString){
  return localeTimeString.replace('.,', ',').replace(/ de /g, ' ').replace('.', ',');
}

function getDateDefaultOptions(){
  return {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  };
}

function buildLocaleBasedDateProps(locale){
  const baseHourOptions = { hour: 'numeric', minute: 'numeric' };
  return locale == 'en-US' ? {
    timeFormatOptions: baseHourOptions,
    formatLocalizedDateString: localeTimeString => localeTimeString
  } : {
    timeFormatOptions: { ...baseHourOptions, hour12: false },
    formatLocalizedDateString: formatNonAmericanDateString
  };
}

export default _public;
