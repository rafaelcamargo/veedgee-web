import { createPortal } from 'react-dom';
import { CloseButton } from '@src/base/components/close-button/close-button';

export const Drawer = ({ isOpen, title, children, onClose }) => {
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
        <div className="v-drawer-header">
          <h3 className="v-drawer-title">{title}</h3>
          <CloseButton onClick={onClose} />
        </div>
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
