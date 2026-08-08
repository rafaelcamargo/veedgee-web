import { createPortal } from 'react-dom';
import { CloseButton } from '@src/base/components/close-button/close-button';

export const Drawer = ({ isOpen, title, image, children, size, onClose, noHeader }) => {
  return createPortal(
    <>
      <div
        className={buildOverlayClassName(isOpen)}
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={buildWrapperClassName(isOpen, size)}>
        <div
          className="v-drawer"
          role="dialog"
          aria-hidden={!isOpen}
          aria-modal="true"
        >
          <CloseButton onClick={onClose} />
          {
            !noHeader && (
              <div className="v-drawer-header">
                <h3 className="v-drawer-title">{title}</h3>
              </div>
            )
          }
          {image}
          <div className="v-drawer-body">
            {children}
          </div>
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

function buildWrapperClassName(isOpen, size){
  const classNames = ['v-drawer-wrapper'];
  if(isOpen) classNames.push('is-open');
  const sizeClassName = buildSizeClassName(size);
  if(sizeClassName) classNames.push(sizeClassName);
  return classNames.join(' ');
}

function buildSizeClassName(size){
  return {
    lg: 'is-large',
    sm: 'is-small',
  }[size];
}
