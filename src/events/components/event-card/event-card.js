import { useTranslation } from '@src/base/hooks/use-translation';
import { Clock } from '@src/base/icons/clock';
import { Pin } from '@src/base/icons/pin';
import { Arrow } from '@src/base/icons/arrow';
import dateService from '@src/base/services/date';
import translations from './event-card.trans';

export const EventCard = ({ eventDetails, titleId }) => {
  const { t, formatDate, formatTime } = useTranslation(translations);
  const { title, date, time, city, state, url } = eventDetails;

  return (
    <div className="v-event-card">
      <time
        className={buildDateTimeClassName(date)}
        dateTime={buildDateTimeString(date, time)}
      >
        <span className="v-event-card-date">
          {handleDateLabel(date, formatDate)}
        </span>
        {
          time && (
            <span className="v-event-card-time">
              <Clock aria-hidden="true" /> {formatTime(time)}
            </span>
          )
        }
      </time>
      <div className="v-event-card-title-wrapper">
        <h2 id={titleId}>{title}</h2>
      </div>
      <a
        href={url}
        aria-label={t('view_event_details')}
        className="v-event-card-details-link"
        rel="noreferrer noopener"
        target="_blank"
      >
        <Arrow aria-hidden="true" />
      </a>
      <address>
        <Pin aria-hidden="true" /> {`${city}, ${state}`}
      </address>
    </div>
  );
};

function buildDateTimeString(date, time){
  return time ? `${date}T${time}` : date;
}

function buildDateTimeClassName(date){
  const classNames = ['v-event-card-datetime'];
  if (dateService.isToday(date) || dateService.isTomorrow(date)) {
    classNames.push('v-event-card-datetime-featured');
  }
  return classNames.join(' ');
}

function handleDateLabel(date, formatDate){
  const { t } = useTranslation(translations);
  if(dateService.isToday(date)) return t('today');
  if(dateService.isTomorrow(date)) return t('tomorrow');
  return formatDate(date);
}
