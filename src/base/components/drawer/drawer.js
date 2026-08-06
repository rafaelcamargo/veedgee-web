import { createPortal } from 'react-dom';
import { useTranslation } from '@compilorama/polang';
import { Button } from '@src/base/components/button/button';
import Close from '@src/base/icons/close';
import translations from './drawer.t.js';

export const Drawer = ({ children, isOpen, onClose }) => {
  const { t } = useTranslation(translations);

  return createPortal(
    <>
      <div
        className={buildOverlayClassName(isOpen)}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={buildClassName(isOpen)}
        role="dialog"
        aria-hidden={!isOpen}
        aria-modal="true"
      >
        <Button
          aria-label={t('close')}
          theme="icon"
          className="v-drawer-close"
          onClick={onClose}
        >
          <Close />
        </Button>
        <div className="v-drawer-body">
          {children}
        </div>
      </div>
    </>,
    document.body
  );
};

function buildOverlayClassName(isOpen){
  const classNames = ['v-drawer-overlay'];
  if(isOpen) classNames.push('is-open');
  return classNames.join(' ');
}

function buildClassName(isOpen){
  const classNames = ['v-drawer'];
  if(isOpen) classNames.push('is-open');
  return classNames.join(' ');
}
