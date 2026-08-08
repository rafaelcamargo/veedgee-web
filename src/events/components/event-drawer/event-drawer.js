import { useTranslation } from '@compilorama/polang';
import { Drawer } from '@src/base/components/drawer/drawer';
import { EventDatetime } from '@src/events/components/event-datetime/event-datetime';
import { EventDrawerImage } from '@src/events/components/event-drawer-image/event-drawer-image';
import translations from './event-drawer.t.js';

// eslint-disable-next-line
export const EventDrawer = ({ eventDetails, isOpen, onClose }) => {
  const { t } = useTranslation(translations);
  const { title, date, time, description, url, image, category } = eventDetails || {};

  return (
    <Drawer
      size="lg"
      isOpen={isOpen}
      image={buildImage({ image, category, title })}
      onClose={onClose}
      noHeader
    >
      {
        eventDetails && (
          <>
            <div className="v-event-drawer-row">
              <EventDatetime date={date} time={time} />
            </div>
            <div className="v-event-drawer-row">
              <h3>{title}</h3>
            </div>
            {
              description && (
                <div className="v-event-drawer-row">
                  <p>{description}</p>
                </div>
              )
            }
            <div className="v-event-drawer-row v-event-drawer-actions">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="v-button v-button-primary"
              >
                {t('event_website')}
              </a>
            </div>
          </>
        )
      }
    </Drawer>
  );
};

function buildImage({ image, category, title }){
  if(!image) return null;
  return (
    <EventDrawerImage
      image={image}
      category={category}
      title={title}
    />
  );
}
