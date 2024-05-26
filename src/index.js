import(/* webpackChunkName: 'workers' */ '@src/base/services/workers');
import '@src/index.styl';
import '@src/base/index.styl';
import { createRoot } from 'react-dom/client';
import { WEBSITE_LOADED } from '@src/base/constants/events';
import analyticsService from '@src/base/services/analytics';
import eventsService from '@src/events/services/events';
import pwaService from '@src/base/services/pwa';
import { App } from './app';

export const init = () => {
  const container = document.querySelector('[data-app]');
  if(container) initApplication(container);
};

function initApplication(container){
  eventsService.get().then(dispatchWebsiteLoaded).catch(dispatchWebsiteLoaded);
  analyticsService.init();
  pwaService.appendManifestLinkIntoDocumentHead();
  createRoot(container).render(<App />);
}

function dispatchWebsiteLoaded(){
  document.dispatchEvent(new CustomEvent(WEBSITE_LOADED));
}

init();
