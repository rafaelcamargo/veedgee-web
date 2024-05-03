import { useState, useEffect } from 'react';
import { Button } from '@src/base/components/button/button';
import { useTranslation } from '@src/base/hooks/use-translation';
import cityService from '@src/base/services/city';
import eventsService from '@src/events/services/events';
import { EventCard } from '@src/events/components/event-card/event-card';
import { LIMIT_FILTER_NAME, DEFAULT_LIMIT } from '@src/events/constants/event-filters';
import translations from './event-list.trans';

// eslint-disable-next-line max-statements
export const EventList = ({ filters, onLoadMore }) => {
  const { t } = useTranslation(translations);
  const [events, setEvents] = useState([]);
  const filteredEvents = filterEvents(events, filters);

  useEffect(() => {
    eventsService.get().then(({ data }) => setEvents(data));
  }, []);

  return (
    <>
      {
        filteredEvents?.length === 0 && (
          <div className="v-event-list-no-results">
            <h2>{t('no_results')}</h2>
            <p>{t('try_redo_filters')}</p>
          </div>
        )
      }
      <ul className="v-event-list">
        {filteredEvents.slice(0, filters.limit).map(eventDetails => {
          const label = `event-${eventDetails.id}`;
          return (
            <li key={eventDetails.id} aria-labelledby={label}>
              <EventCard eventDetails={eventDetails} titleId={label} />
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
    </>
  );
};

function buildNewLimit(currentLimit){
  return { [LIMIT_FILTER_NAME]: currentLimit + DEFAULT_LIMIT };
}

function filterEvents(events, { city, startDate, endDate }){
  return events.filter(event => {
    return isInDateRange(event.date, startDate, endDate) && isInCity(event.city, city);
  });
}

function isInDateRange(eventDate, startDate, endDate){
  if(!endDate) return eventDate >= startDate;
  return eventDate >= startDate && eventDate <= endDate;
}

function isInCity(eventCity, city){
  return !city || cityService.getCityCode(eventCity) === city;
}

function hasMoreEvents(filteredEvents, limit){
  return filteredEvents?.length > limit;
}
