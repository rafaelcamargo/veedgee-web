import './topbar.styl';
import { Link } from 'react-router-dom';
import { useTranslation } from '@src/base/hooks/use-translation';
import { Container } from '@src/base/components/container/container';
import { Logo } from '@src/base/components/logo/logo';
import translations from './topbar.trans';

export const Topbar = () => {
  const { t } = useTranslation(translations);

  return (
    <div className="v-topbar">
      <Container>
        <h1>
          Veedgee
          <Link to="/" aria-label={t('homepage')}>
            <Logo role="presentation" aria-hidden="true" />
          </Link>
        </h1>
      </Container>
    </div>
  );
};
