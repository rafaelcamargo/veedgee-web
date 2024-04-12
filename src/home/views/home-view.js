import { useTranslation } from '@src/base/hooks/use-translation';
import translations from './home-view.trans.json';

export const HomeView = () => {
  const { t } = useTranslation(translations);

  return (
    <>
      <h1>Veedgee</h1>
      <h2>{t('find_events')}</h2>
    </>
  );
};
