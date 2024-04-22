import './event-card.styl';
import { useTranslation } from '@src/base/hooks/use-translation';
import { Clock } from '@src/base/icons/clock';
import { Pin } from '@src/base/icons/pin';
import { Arrow } from '@src/base/icons/arrow';
import translations from './event-card.trans';

export const EventCard = ({ eventDetails, titleId }) => {
  const { t, formatDate, formatTime } = useTranslation(translations);
  const { title, date, time, city, state, url } = eventDetails;

  return (
    <div className="v-event-card">
      <time className="v-event-card-datetime" dateTime={buildDateTimeString(date, time)}>
        <span className="v-event-card-date">
          {formatDate(date)}
        </span>
        {
          time && (
            <span className="v-event-card-time">
              <Clock aria-hidden="true" /> {formatTime(time)}
            </span>
          )
        }
      </time>
      <h2 id={titleId}>{title}</h2>
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
