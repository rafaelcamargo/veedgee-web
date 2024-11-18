import(/* webpackChunkName: 'installation-css' */ '@src/installation/index.styl');
import { Link } from 'react-router-dom';
import { useTranslation } from '@src/base/hooks/use-translation';
import { Container } from '@src/base/components/container/container';
import { Footer } from '@src/base/components/footer/footer';
import { Logo } from '@src/base/components/logo/logo';
import { More } from '@src/base/icons/more';
import { Share } from '@src/base/icons/share';
import windowService from '@src/base/services/window';
import translations from './installation-view.trans.json';

// eslint-disable-next-line complexity
const InstallationView = () => {
  const { t } = useTranslation(translations);
  const device = windowService.getSearchParam('device');

  return (
    <div className="v-installation-view">
      <Container>
        <Link to="/" aria-label={t('homepage')}>
          <Logo />
        </Link>
        <h1>{t('installation')}</h1>
        <p>{t('intro')}</p>
        {
          shouldShowInstructions('iphone', device) && (
            <section aria-label={t('iphone_instructions')}>
              {!device && <h2>{t('iphone')}</h2>}
              <ol>
                <li>
                  {t('tap_share')}<span><Share aria-hidden="true" /></span>{t('share_icon_details')};
                </li>
                <li>{t('tap')} <b>{t('add_to_homescreen')}</b>;</li>
                <li>{t('final_tap')} <b>{t('add')}</b>.</li>
              </ol>
            </section>
          )
        }
        {
          shouldShowInstructions('android', device) && (
            <section aria-label={t('android_instructions')}>
              {!device && <h2>{t('android')}</h2>}
              <ol>
                <li>
                  {t('tap_more')}<span><More aria-hidden="true" /></span>{t('more_icon_details')};
                </li>
                <li>{t('tap')} <b>{t('add_to_homescreen')}</b>;</li>
                <li>{t('final_tap')} <b>{t('install')}</b>.</li>
              </ol>
            </section>
          )
        }
      </Container>
      <Footer />
    </div>
  );
};

function shouldShowInstructions(expectedDevice, currentDevice){
  return !currentDevice || expectedDevice === currentDevice;
}

export default InstallationView;
