import { I18nProvider } from '@src/base/providers/i18n';
import { Router } from '@src/router';

export const App = () => {
  return (
    <I18nProvider>
      <Router />
    </I18nProvider>
  );
};
