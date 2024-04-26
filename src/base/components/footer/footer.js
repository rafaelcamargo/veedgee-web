import { useTranslation } from '@src/base/hooks/use-translation';
import { Container } from '@src/base/components/container/container';
import { LocaleSelect } from '@src/base/components/locale-select/locale-select';
import translations from './footer.trans';

export const Footer = () => {
  const { t } = useTranslation(translations);

  return (
    <div className="v-footer">
      <Container>
        <div className="v-footer-configurations">
          <LocaleSelect />
        </div>
        <p className="v-footer-credits">
          {t('credits')}
        </p>
      </Container>
    </div>
  );
};
