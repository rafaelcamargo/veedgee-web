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

_public.buildISOString = dateObj => dateObj.toISOString().split('T')[0];

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
