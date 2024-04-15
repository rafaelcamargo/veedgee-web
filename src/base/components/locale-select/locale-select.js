import { useContext } from 'react';
import { useTranslation } from '@src/base/hooks/use-translation';
import i18nContext from '@src/base/contexts/i18n';
import translations from './locale-select.trans';

export const LocaleSelect = () => {
  const { currentLocale, handleLocaleChange, locales } = useContext(i18nContext);
  const { t } = useTranslation(translations);
  const handleChange = ({ target: { value } }) => handleLocaleChange(value);

  return (
    <select aria-label={t('language')} value={currentLocale} onChange={handleChange}>
      {locales?.map(({ code, name }) => (
        <option key={code} value={code}>{name}</option>
      ))}
    </select>
  );
};
