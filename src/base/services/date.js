const _public = {};

_public.getNow = () => new Date();

_public.format = (dateString, { locale }) => {
  const date = buildDateFromString(dateString);
  const result =  new Intl.DateTimeFormat(locale, getDateDefaultOptions()).format(date);
  return locale == 'pt-BR' ? formatBrazilianDate(result) : result;
};

_public.formatTime = (timeString, { locale }) => {
  const date = buildDateFromTimeString(timeString);
  return new Intl.DateTimeFormat(locale, getTimeDefaultOptions()).format(date);
};

_public.isToday = dateString => {
  const today = _public.getNow();
  return isSameDay(today, buildDateFromString(dateString));
};

_public.isTomorrow = dateString => {
  const ONE_DAY = 86400000;
  const tomorrow = new Date(_public.getNow().getTime() + ONE_DAY);
  return isSameDay(tomorrow, buildDateFromString(dateString));
};

_public.buildISOString = dateObj => dateObj.toISOString().split('T')[0];

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

function formatBrazilianDate(localeTimeString){
  return localeTimeString.replace('.,', ',').replace(/ de /g, ' ').replace('.', ',');
}

function getDateDefaultOptions(){
  return {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  };
}

function getTimeDefaultOptions(){
  return {
    hour: 'numeric',
    minute: 'numeric'
  };
}

export default _public;
