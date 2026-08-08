import { Suspense } from 'react';
import { useTranslation } from '@compilorama/polang';
import { useEventCategories } from '@src/events/hooks/use-event-categories';
import translations from './event-category-tag.t.js';

export const EventCategoryTag = ({ category }) => {
  const { t } = useTranslation(translations);
  const { getCategoryName, getCategoryIcon } = useEventCategories();
  const Icon = getCategoryIcon(category);

  return (
    <div
      className="v-event-category-tag"
      data-tooltip={getCategoryName(category)}
    >
      {
        Icon && (
          <Suspense fallback={<></>}>
            <Icon />
            <span className="v-event-category-caption">
              {t('category_label', { name: getCategoryName(category) })}
            </span>
          </Suspense>
        )
      }
    </div>
  );
};
