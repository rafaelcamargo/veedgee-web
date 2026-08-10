import { useTranslation } from '@compilorama/polang';
import imageService from '@src/base/services/image';
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
      image={eventDetails && buildImage({ image, category, title })}
      className={buildClassName(image)}
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
  return (
    <EventDrawerImage
      image={buildImageSrc(image)}
      category={category}
      title={title}
    />
  );
}

function buildImageSrc(image){
  return hasValidImage(image)
    ? image
    : `${imageService.getImagesPath()}/event-category-placeholder.webp`;
}

function buildClassName(image){
  const classNames = ['v-event-drawer'];
  if(!hasValidImage(image)) classNames.push('has-placeholder-image');
  return classNames.join(' ');
}

function hasValidImage(image){
  return image && imageService.isValidSrc(image);
}
