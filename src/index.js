import { createRoot } from 'react-dom/client';
import { WEBSITE_LOADED } from '@src/base/constants/events';
import analyticsService from '@src/base/services/analytics';
import { App } from './app';

export const init = () => {
  const container = document.querySelector('[data-app]');
  if(container) {
    analyticsService.init();
    createRoot(container).render(<App />);
    document.dispatchEvent(new CustomEvent(WEBSITE_LOADED));
  }
};

init();
