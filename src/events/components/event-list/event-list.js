import './event-list.styl';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from '@src/base/hooks/use-translation';
import eventsService from '@src/events/services/events';
import { EventCard } from '@src/events/components/event-card/event-card';
import translations from './event-list.trans';

// eslint-disable-next-line max-statements
export const EventList = () => {
  const { t } = useTranslation(translations);
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [limit, setLimit] = useState(getInitialLimit(searchParams.get('limit')));
  const loadMore = () => setLimit(prevState => prevState + getPageSize());

  useEffect(() => {
    eventsService.get().then(({ data }) => setEvents(data));
  }, []);

  useEffect(() => {
    limit != getPageSize() && setSearchParams({ limit }, { replace: true });
  }, [limit]);

  return (
    <>
      <ul className="v-event-list">
        {limitEvents(events, limit).map(eventDetails => {
          const label = `event-${eventDetails.id}`;
          return (
            <li key={eventDetails.id} aria-labelledby={label}>
              <EventCard eventDetails={eventDetails} titleId={label} />
            </li>
          );
        })}
      </ul>
      {
        hasMoreEvents(events, limit) && (
          <button
            className="v-event-list-load-more-button"
            onClick={loadMore}
          >
            {t('load_more')}
          </button>
        )
      }
    </>
  );
};

function getInitialLimit(customLimit){
  return customLimit || getPageSize();
}

function getPageSize(){
  return 30;
}

function limitEvents(events, limit){
  return events.slice(0, limit);
}

function hasMoreEvents(events, limit){
  return events?.length > limit;
}
