import './index.styl';
import { createRoot } from 'react-dom/client';
import { WEBSITE_LOADED } from '@src/base/constants/events';
import analyticsService from '@src/base/services/analytics';
import eventsService from '@src/events/services/events';
import { App } from './app';

export const init = () => {
  const container = document.querySelector('[data-app]');
  if(container) {
    eventsService.get().then(dispatchWebsiteLoaded).catch(dispatchWebsiteLoaded);
    analyticsService.init();
    createRoot(container).render(<App />);
  }
};

function dispatchWebsiteLoaded(){
  document.dispatchEvent(new CustomEvent(WEBSITE_LOADED));
}

init();
