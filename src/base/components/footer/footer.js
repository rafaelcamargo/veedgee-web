import { useTranslation } from '@compilorama/polang';
import { Container } from '@src/base/components/container/container';
import { LocaleSelect } from '@src/base/components/locale-select/locale-select';
import translations from './footer.t.js';

export const Footer = () => {
  const { t, locale } = useTranslation(translations);
  const localeCode = locale.code;

  return (
    <div className="v-footer">
      <Container>
        <div className="v-footer-configurations">
          <LocaleSelect />
        </div>
        <p className="v-footer-credits">
          {t('credits', {
            portfolioLink: (
              <a {...buildExternalLinkProps('rafaelcamargo.com', localeCode)}>
                Rafael Camargo
              </a>
            ),
            compiloramaLink: (
              <a {...buildExternalLinkProps('compilorama.com', localeCode)}>
                Compilorama
              </a>
            )
          })}
        </p>
      </Container>
    </div>
  );
};

function buildExternalLinkProps(website, localeCode) {
  return {
    href: `https://${website}?utm_source=veedgee&locale=${localeCode}`,
    target: '_blank',
    rel: 'noopener noreferrer'
  };
}
