import { useState, useEffect } from 'react';
import viewportService from '@src/base/services/viewport';

export const useViewport = () => {
  const [innerWidth, setInnerWidth] = useState(viewportService.getWidth());
  const handleResize = ({ target }) => setInnerWidth(target.innerWidth);

  useEffect(() => {
    viewportService.listenResize(handleResize);
    return () => viewportService.unlistenResize(handleResize);
  }, []);

  return {
    isMobile: innerWidth < 768
  };
};
