import { LocaleSelect as PolangLocaleSelect, useTranslation } from '@compilorama/polang';
import translations from './locale-select.t.js';

export const LocaleSelect = ({ ...rest }) => {
  const { t } = useTranslation(translations);

  return (
    <PolangLocaleSelect name="locale" aria-label={t('language')} {...rest} />
  );
};
