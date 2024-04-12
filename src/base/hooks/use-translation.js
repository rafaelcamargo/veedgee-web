import { useContext } from 'react';
import i18nContext from '@src/base/contexts/i18n';

export const useTranslation = translations => {
  const { currentLocale } = useContext(i18nContext);
  const translate = key => translations[currentLocale][key];
  return { t: translate };
};
