import { Link } from 'react-router-dom';
import { useTranslation } from '@src/base/hooks/use-translation';
import { Container } from '@src/base/components/container/container';
import { Logo } from '@src/base/components/logo/logo';
import translations from './topbar.trans';

export const Topbar = ({ children }) => {
  const { t } = useTranslation(translations);

  return (
    <div className="v-topbar">
      <Container>
        <div className="v-topbar-content">
          <h1>
            Veedgee
            <Link to="/" aria-label={t('homepage')}>
              <Logo role="presentation" aria-hidden="true" />
            </Link>
          </h1>
          {
            children && (
              <div className="v-topbar-custom-content">
                {children}
              </div>
            )
          }
        </div>
      </Container>
    </div>
  );
};
