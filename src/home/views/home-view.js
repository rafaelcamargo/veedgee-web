import './home-view.styl';
import { Link } from 'react-router-dom';
import routes from '@src/routes';
import { useTranslation } from '@src/base/hooks/use-translation';
import { Logo } from '@src/base/components/logo/logo';
import { Container } from '@src/base/components/container/container';
import { Tag } from '@src/base/components/tag/tag';
import { Footer } from '@src/base/components/footer/footer';
import { Magnet } from '@src/base/icons/magnet';
import { Magnifier } from '@src/base/icons/magnifier';
import { Notification } from '@src/base/icons/notification';
import translations from './home-view.trans.json';

export const HomeView = () => {
  const { t } = useTranslation(translations);
  const heroSectionName = 'Veedgee';

  return (
    <div className="v-home-view">
      <section className="v-home-hero" aria-label={heroSectionName}>
        <Container>
          <h1>
            {heroSectionName}
            <Logo aria-hidden="true" />
          </h1>
          <h2>{t('find_events')}</h2>
          <Link className="v-button" to={routes[1].path}>{t('search')}</Link>
        </Container>
      </section>
      <section className="v-home-about" aria-label={t('how_it_works')}>
        <Container>
          <h2>{t('how_it_works')}</h2>
          <ul className="v-home-about-items">
            {
              buildHowItWorksItems(t).map(({ Icon, text, tagText }, index) => (
                <li key={index}>
                  <div className="v-home-about-item-icon-wrapper">
                    <Icon aria-hidden="true" />
                  </div>
                  <div>
                    <p>
                      {text}
                    </p>
                    {tagText && <Tag>{tagText}</Tag>}
                  </div>
                </li>
              ))
            }
          </ul>
        </Container>
      </section>
      <Footer />
    </div>
  );
};

function buildHowItWorksItems(t){
  return [
    {
      Icon: Magnet,
      text: t('grabs_events')
    },
    {
      Icon: Magnifier,
      text: t('formats_them')
    },
    {
      Icon: Notification,
      text: t('sends_notification'),
      tagText: t('closed_beta')
    }
  ];
}
