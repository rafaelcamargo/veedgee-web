const baseManifest = require('../manifests/base');
const englishManifest = require('../manifests/en-US');
const portugueseManifest = require('../manifests/pt-BR');

const _public = {};

const APP_MODE_SEARCH_PARAM = 'ref';
const PWA_MODE = 'pwa';

_public.appendManifestLinkIntoDocumentHead = () => {
  if(!isPrerendering()) {
    const head = document.querySelector('head');
    head.appendChild(buildManifestTagElement());
  }
};

_public.buildManifestByLocale = (locale = 'en-US') => {
  const startUrl = `/events?${APP_MODE_SEARCH_PARAM}=${PWA_MODE}`;
  return {
    ...cloneJSON(baseManifest),
    ...getLocalizedManifest(locale),
    lang: locale,
    start_url: locale != 'en-US' ? `${startUrl}&locale=${locale}` : startUrl
  };
};

_public.configAppMode = () => {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get(APP_MODE_SEARCH_PARAM);
  if(mode === PWA_MODE) window.localStorage.setItem('vmode', PWA_MODE);
};

function isPrerendering(){
  return getSearchParam('prerender');
}

function buildManifestTagElement(){
  const tag = document.createElement('link');
  const locale = getSearchParam('locale') || 'en-US';
  tag.setAttribute('rel', 'manifest');
  tag.setAttribute('href', `/manifest.json?locale=${locale}&v=1`);
  return tag;
}

function cloneJSON(json){
  return JSON.parse(JSON.stringify(json));
}

function getLocalizedManifest(locale){
  return {
    'en-US': englishManifest,
    'pt-BR': portugueseManifest
  }[locale];
}

function getSearchParam(param){
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

module.exports = _public;
