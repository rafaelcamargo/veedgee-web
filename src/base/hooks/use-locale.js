import { useState } from 'react';

export const useLocale = () => {
  const locales = getAvailableLocales();
  const defaultLocale = locales[0].code;
  const [currentLocale, setCurrentLocale] = useState(getInitialLocale(defaultLocale));
  const handleLocaleChange = locale => {
    setLocaleSearchParam(locale);
    setCurrentLocale(locale);
    storeLocale(locale);
  };
  return { currentLocale, handleLocaleChange, locales };
};

function getAvailableLocales(){
  return [
    { code: 'en-US', name: 'English' },
    { code: 'pt-BR', name: 'Português' },
  ];
}

function getInitialLocale(defaultLocale){
  return getLocaleSearchParam() || getStoredLocale() || defaultLocale;
}

function setLocaleSearchParam(locale){
  const params = getCurrentSearchParams();
  params.set(getLocaleSearchParamKey(), locale);
  const { origin, pathname } = window.location;
  window.history.replaceState({}, '', `${origin}${pathname}?${params.toString()}`);
}

function getLocaleSearchParam(){
  return getCurrentSearchParams().get(getLocaleSearchParamKey());
}

function getCurrentSearchParams(){
  return new URLSearchParams(window.location.search);
}

function getStoredLocale(){
  return localStorage.getItem(getLocaleStorageKey());
}

function storeLocale(locale){
  localStorage.setItem(getLocaleStorageKey(), locale);
}

function getLocaleSearchParamKey(){
  return 'locale';
}

function getLocaleStorageKey(){
  return 'vlocale';
}
