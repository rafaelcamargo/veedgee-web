import { Suspense } from 'react';
import { DrawerImage } from '@src/base/components/drawer-image/drawer-image';
import { useEventCategories } from '@src/events/hooks/use-event-categories';

export const EventDrawerImage = ({ image, category, title }) => {
  const { getCategoryName, getCategoryIcon } = useEventCategories();
  const Icon = getCategoryIcon(category);

  return (
    <DrawerImage
      src={image}
      alt={title}
      description={buildDescription(Icon, getCategoryName(category))}
    />
  );
};

function buildDescription(Icon, categoryName){
  return Icon && (
    <div className="v-event-drawer-image-category">
      <Suspense fallback={<></>}>
        <Icon />
      </Suspense>
      <span>{categoryName}</span>
    </div>
  );
}
