import { Button } from '@src/base/components/button/button';
import { Loader } from '@src/base/components/loader/loader';
import { useTranslation } from '@compilorama/polang';
import cityService from '@src/base/services/city';
import { removeAccents } from '@src/base/services/text';
import { useEvents } from '@src/events/hooks/use-events';
import { EventCard } from '@src/events/components/event-card/event-card';
import { LIMIT_FILTER_NAME, DEFAULT_LIMIT } from '@src/events/constants/event-filters';
import translations from './event-list.t.js';

// eslint-disable-next-line
export const EventList = ({ filters, onLoadMore }) => {
  const { t } = useTranslation(translations);
  const { data: events, loading, failed, fetchEvents } = useEvents();
  const filteredEvents = filterEvents(events, filters);

  return (
    <div aria-live="polite">
      {
        loading && buildFeedback(
          <Loader>
            {t('loading')}
          </Loader>
        )
      }
      {
        failed && buildFeedback(
          <>
            <h2>{t('something_went_wrong')}</h2>
            <p>{t('could_not_be_possible_to_fetch_events')}</p>
            <Button theme="primary" onClick={fetchEvents}>
              {t('retry')}
            </Button>
          </>
        )
      }
      {
        filteredEvents?.length === 0 && buildFeedback(
          <>
            <h2>{t('no_results')}</h2>
            <p>{t('try_redo_filters')}</p>
          </>
        )
      }
      <ul className="v-event-list">
        {filteredEvents?.slice(0, filters.limit).map(eventDetails => {
          const label = `event-${eventDetails.id}`;
          return (
            <li key={eventDetails.id} aria-labelledby={label}>
              <EventCard
                titleFilter={filters.title}
                eventDetails={eventDetails}
                titleId={label}
              />
            </li>
          );
        })}
      </ul>
      {
        hasMoreEvents(filteredEvents, filters.limit) && (
          <Button
            theme="primary"
            className="v-event-list-load-more-button"
            onClick={() => onLoadMore(buildNewLimit(filters.limit))}
          >
            {t('load_more')}
          </Button>
        )
      }
    </div>
  );
};

function buildFeedback(content){
  return (
    <div className="v-event-list-feedback-wrapper">
      {content}
    </div> 
  );
}

function buildNewLimit(currentLimit){
  return { [LIMIT_FILTER_NAME]: currentLimit + DEFAULT_LIMIT };
}

function filterEvents(events, { title, city, startDate, endDate }){
  return events?.filter(event => {
    return isInDateRange(event.date, startDate, endDate) &&
      isInCity(event.city, city) &&
      includesTextOnTitle(event.title, title);
  });
}

function isInDateRange(eventDate, startDate, endDate){
  if(!endDate) return eventDate >= startDate;
  return eventDate >= startDate && eventDate <= endDate;
}

function isInCity(eventCity, city){
  return !city || cityService.getCityCode(eventCity) === city;
}

function includesTextOnTitle(eventTitle, title){
  const normalizedEventTitle = removeAccents(eventTitle);
  const normalizedTitleFilter = removeAccents(title);
  return !title || normalizedEventTitle.toLowerCase().includes(normalizedTitleFilter.trim().toLowerCase());
}

function hasMoreEvents(filteredEvents, limit){
  return filteredEvents?.length > limit;
}
