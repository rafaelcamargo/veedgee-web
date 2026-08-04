import { lazy, Suspense } from 'react';
import { useTranslation } from '@compilorama/polang';
import { useEventCategories } from '@src/events/hooks/use-event-categories';
import translations from './event-category-tag.t.js';

export const EventCategoryTag = ({ category }) => {
  const { t } = useTranslation(translations);
  const { getCategoryName } = useEventCategories();
  const Icon = CATEGORY_ICONS[category];

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

const CATEGORY_ICONS = {
  sports: lazy(() => import('@src/base/icons/ball')),
  family: lazy(() => import('@src/base/icons/balloon')),
  exhibitions: lazy(() => import('@src/base/icons/brush')),
  nightlife: lazy(() => import('@src/base/icons/cocktail')),
  movies: lazy(() => import('@src/base/icons/film')),
  festivals: lazy(() => import('@src/base/icons/flag')),
  food: lazy(() => import('@src/base/icons/fork')),
  theater: lazy(() => import('@src/base/icons/masks')),
  comedy: lazy(() => import('@src/base/icons/mic')),
  education: lazy(() => import('@src/base/icons/mortarboard')),
  musicals: lazy(() => import('@src/base/icons/musical')),
  music: lazy(() => import('@src/base/icons/note')),
  dance: lazy(() => import('@src/base/icons/shoe')),
  business: lazy(() => import('@src/base/icons/suitcase')),
  fair: lazy(() => import('@src/base/icons/tent')),
};
