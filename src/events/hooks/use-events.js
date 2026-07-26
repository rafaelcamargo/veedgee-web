import { useState, useEffect } from 'react';
import { useTranslation } from '@compilorama/polang';
import eventsService from '@src/events/services/events';

export const useEvents = () => {
  const { locale } = useTranslation({});
  const [events, setEvents] = useState({ loading: true });
  const fetchEvents = () => {
    return eventsService.get()
      .then(({ data }) => setEvents({ data }))
      .catch(() => setEvents(() => ({ failed: true })));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    ...events,
    data: localizeEvents(events.data, locale.code),
    fetchEvents
  };
};

function localizeEvents(events, localeCode){
  return events?.map(event => localizeEvent(event, localeCode));
}

function localizeEvent(event, localeCode){
  return {
    ...event,
    title: getLocalizedValue(event.enhanced_title, localeCode) || event.title,
    description: getLocalizedValue(event.enhanced_description, localeCode) || event.description
  };
}

function getLocalizedValue(enhancedValue, localeCode){
  if(!enhancedValue) return null;
  const localeRegex = new RegExp(`\\[${escapeRegExp(localeCode)}\\]\\s*([^\\[]+)`);
  const match = enhancedValue.match(localeRegex);
  return match?.[1]?.trim();
}

function escapeRegExp(value){
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
