import { useTranslation } from '@compilorama/polang';
import translations from './use-event-categories.t.js';

export const useEventCategories = () => {
  const { t } = useTranslation(translations);

  return {
    getCategoryName: category => t(category)
  };
};
