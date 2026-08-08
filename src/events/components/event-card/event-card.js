import { useTranslation } from '@compilorama/polang';
import Arrow from '@src/base/icons/arrow';
import Pin from '@src/base/icons/pin';
import { highlightTerm } from '@src/base/services/text';
import { EventCategoryTag } from '@src/events/components/event-category-tag/event-category-tag';
import { EventDatetime } from '@src/events/components/event-datetime/event-datetime';
import translations from './event-card.t.js';

export const EventCard = ({ titleFilter, eventDetails, titleId, onViewDetails }) => {
  const { t } = useTranslation(translations);
  const { id, title, date, time, city, state, category } = eventDetails;

  const handleViewDetails = () => onViewDetails?.(eventDetails);

  return (
    <div className="v-event-card">
      <div className="v-event-card-header" id={`eventCardHeader_${id}`}>
        { category && <EventCategoryTag category={category} /> }
        <EventDatetime date={date} time={time} />
      </div>
      <div className="v-event-card-title-wrapper">
        <h2
          id={titleId}
          title={title}
          dangerouslySetInnerHTML={{ __html: handleTitle(title, titleFilter) }}
        />
      </div>
      <button
        type="button"
        aria-label={t('view_event_details')}
        className="v-event-card-details-link"
        onClick={handleViewDetails}
      >
        <Arrow />
      </button>
      <address>
        <Pin /> {`${city}, ${state}`}
      </address>
    </div>
  );
};

function handleTitle(title, titleFilter){
  const truncatedTitle = title?.length > 108 ? truncateTitle(title) : title;
  return titleFilter ? highlightTerm(truncatedTitle, titleFilter) : truncatedTitle;
}

function truncateTitle(title){
  return `${title.slice(0,107).trim()}…`;
}
