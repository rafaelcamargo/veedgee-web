import { useLocale } from '@src/base/hooks/use-locale';
import I18n from '@src/base/contexts/i18n';

export const I18nProvider = ({ children }) => {
  const { currentLocale, handleLocaleChange, locales } = useLocale();

  return (
    <I18n.Provider value={{ currentLocale, handleLocaleChange, locales }}>
      {children}
    </I18n.Provider>
  );
};
