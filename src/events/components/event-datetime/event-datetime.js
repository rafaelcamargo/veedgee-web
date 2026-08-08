import { useTranslation } from '@compilorama/polang';
import Clock from '@src/base/icons/clock';
import dateService from '@src/base/services/date';
import translations from './event-datetime.t.js';

export const EventDatetime = ({ date, time }) => {
  const { t, locale } = useTranslation(translations);
  const localeCode = locale.code;

  return (
    <time
      className={buildDateTimeClassName(date)}
      dateTime={buildDateTimeString(date, time)}
    >
      <span className="v-event-datetime-date">
        {handleDateLabel(date, localeCode, t)}
      </span>
      {
        time && (
          <span className="v-event-datetime-time">
            <Clock /> {formatTime(time, localeCode)}
          </span>
        )
      }
    </time>
  );
};

function buildDateTimeString(date, time){
  return time ? `${date}T${time}` : date;
}

function buildDateTimeClassName(date){
  const classNames = ['v-event-datetime'];
  if (dateService.isToday(date) || dateService.isTomorrow(date)) {
    classNames.push('is-featured');
  }
  return classNames.join(' ');
}

function handleDateLabel(date, localeCode, t){
  if(dateService.isToday(date)) return t('today');
  if(dateService.isTomorrow(date)) return t('tomorrow');
  return formatDate(date, localeCode);
}

function formatDate(date, localeCode){
  return dateService.format(date, { locale: localeCode });
}

function formatTime(time, localeCode){
  return dateService.formatTime(time, { locale: localeCode });
}
