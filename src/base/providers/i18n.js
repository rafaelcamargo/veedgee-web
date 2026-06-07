import { I18nProvider as PolangI18nProvider } from '@compilorama/polang';

const locales = [
  { code: 'en-US', name: 'English' },
  { code: 'pt-BR', name: 'Português' },
];

export const I18nProvider = ({ children }) => (
  <PolangI18nProvider locales={locales}>
    {children}
  </PolangI18nProvider>
);
