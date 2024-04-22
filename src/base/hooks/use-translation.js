import { useContext } from 'react';
import i18nContext from '@src/base/contexts/i18n';
import dateService from '@src/base/services/date';

export const useTranslation = translations => {
  const { currentLocale } = useContext(i18nContext);
  const translate = key => translations[currentLocale][key];
  const formatDateTime = (string, type) => {
    const format = type == 'time' ? dateService.formatTime : dateService.format;
    return format(string, { locale: currentLocale });
  };
  return {
    t: translate,
    formatDate: value => formatDateTime(value),
    formatTime: value => formatDateTime(value, 'time')
  };
};
