import { useTranslation } from '@compilorama/polang';
import translations from './use-event-categories.t.js';

export const useEventCategories = () => {
  const { t } = useTranslation(translations);
  const categoryIds = Object.keys(translations['en-US']);

  return {
    getCategoryName: category => t(category),
    getCategories: () => categoryIds.map(id => ({
      id,
      name: t(id)
    }))
  };
};
