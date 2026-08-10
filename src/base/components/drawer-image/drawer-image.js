import { useState } from 'react';
import imageService from '@src/base/services/image';

export const DrawerImage = ({ src, alt, description }) => {
  const [loadedSrc, setLoadedSrc] = useState('');

  return (
    <div className={buildClassName(loadedSrc === src)}>
      {
        imageService.isValidSrc(src) && (
          <>
            <img
              src={src}
              alt=""
              className="v-drawer-image-backdrop"
              aria-hidden="true"
            />
            <img
              src={src}
              alt={alt}
              className="v-drawer-image-picture"
              onLoad={() => setLoadedSrc(src)}
            />
          </>
        )
      }
      <div className="v-drawer-image-gradient" aria-hidden="true" />
      {
        description && (
          <div className="v-drawer-image-description">
            {description}
          </div>
        )
      }
    </div>
  );
};

function buildClassName(isLoaded){
  const cssClasses = ['v-drawer-image'];
  if(isLoaded) cssClasses.push('is-loaded');
  return cssClasses.join(' ');
}
