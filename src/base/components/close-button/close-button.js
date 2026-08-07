import { useTranslation } from '@compilorama/polang';
import { Button } from '@src/base/components/button/button';
import Close from '@src/base/icons/close';
import translations from './close-button.t.js';

export const CloseButton = props => {
  const { t } = useTranslation(translations);

  return (
    <div className="v-close-button">
      <Button
        theme="icon"
        aria-label={t('close')}
        {...props}
      >
        <Close />
      </Button>
    </div>
  );
};
