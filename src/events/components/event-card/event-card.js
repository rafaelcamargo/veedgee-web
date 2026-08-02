import { useTranslation } from '@compilorama/polang';
import Arrow from '@src/base/icons/arrow';
import Clock from '@src/base/icons/clock';
import Pin from '@src/base/icons/pin';
import dateService from '@src/base/services/date';
import { highlightTerm } from '@src/base/services/text';
import { EventCategoryTag } from '@src/events/components/event-category-tag/event-category-tag';
import translations from './event-card.t.js';

export const EventCard = ({ titleFilter, eventDetails, titleId }) => {
  const { t, locale } = useTranslation(translations);
  const localeCode = locale.code;
  const { id, title, date, time, city, state, url, category } = eventDetails;

  return (
    <div className="v-event-card">
      <div className="v-event-card-header" id={`eventCardHeader_${id}`}>
        { category && <EventCategoryTag category={category} /> }
        <time
          className={buildDateTimeClassName(date)}
          dateTime={buildDateTimeString(date, time)}
        >
          <span className="v-event-card-date">
            {handleDateLabel(date, localeCode, t)}
          </span>
          {
            time && (
              <span className="v-event-card-time">
                <Clock /> {formatTime(time, localeCode)}
              </span>
            )
          }
        </time>
      </div>
      <div className="v-event-card-title-wrapper">
        <h2
          id={titleId}
          title={title}
          dangerouslySetInnerHTML={{ __html: handleTitle(title, titleFilter) }}
        />
      </div>
      <a
        href={url}
        aria-label={t('view_event_details')}
        className="v-event-card-details-link"
        rel="noreferrer noopener"
        target="_blank"
      >
        <Arrow />
      </a>
      <address>
        <Pin /> {`${city}, ${state}`}
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

function handleTitle(title, titleFilter){
  const truncatedTitle = title?.length > 108 ? truncateTitle(title) : title;
  return titleFilter ? highlightTerm(truncatedTitle, titleFilter) : truncatedTitle;
}

function truncateTitle(title){
  return `${title.slice(0,107).trim()}…`;
}
