import { createPortal } from 'react-dom';
import { CloseButton } from '@src/base/components/close-button/close-button';

export const Drawer = ({ isOpen, title, image, children, size, className, onClose, noHeader }) => {
  return createPortal(
    <>
      <div
        className={buildOverlayClassName(isOpen)}
        onClick={onClose}
        aria-hidden="true"
      />
      <div className={buildWrapperClassName(isOpen, size)}>
        <div
          className={buildDrawerClassName(className)}
          role="dialog"
          aria-hidden={!isOpen}
          aria-modal="true"
        >
          <CloseButton className="v-drawer-close-button" onClick={onClose} />
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

function buildDrawerClassName(className){
  const classNames = ['v-drawer'];
  if(className) classNames.push(className);
  return classNames.join(' ');
}

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
