import './installation-banner.styl';
import { Link } from 'react-router-dom';
import { IPHONE, ANDROID } from '@src/base/constants/mobile-device-models';
import { Harrow } from '@src/base/icons/harrow';
import { useTranslation } from '@src/base/hooks/use-translation';
import { getMobileDeviceModel } from '@src/base/services/device';
import translations from './installation-banner.trans';

export const InstallationBanner = () => {
  const { t } = useTranslation(translations);
  const mobileDeviceModel = getMobileDeviceModel();
  const mode = window.localStorage.getItem('vmode');
  const buildBannerTitle = () => {
    return {
      [IPHONE]: t('install_iphone'),
      [ANDROID]: t('install_android')
    }[mobileDeviceModel];
  };

  return mode !== 'pwa' && !!mobileDeviceModel ? (
    <div className="v-installation-banner">
      <div className="v-installation-banner-copy">
        <h3>{buildBannerTitle()}</h3>
        <p>{t('faster_and_works_offline')}</p>
      </div>
      <Link to={`/install?device=${mobileDeviceModel}`} aria-label={t('view_instructions')}>
        <Harrow />
      </Link>
    </div>
  ) : null;
};
