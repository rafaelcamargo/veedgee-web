import { useState } from 'react';

export const useSearchParams = () => {
  const [params, setParams] = useState(getURLSearchParams());
  const setSearchParams = params => {
    const newParams = { ...getURLSearchParams(), ...params };
    setParams(newParams);
    window.history.replaceState({}, null, buildNewFullUrl(buildSearchParams(newParams)));
  };

  return [params, setSearchParams];
};

function getURLSearchParams(){
  const searchParams = new URLSearchParams(window.location.search);
  return Array.from(searchParams.entries()).reduce((params, [key, value]) => {
    return { ...params, [key]: value };
  }, {});
}

function buildSearchParams(params){
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => value && searchParams.set(key, value));
  return searchParams;
}

function buildNewFullUrl(searchParams){
  return [getCurrentUrl(), searchParams.toString()].join('?');
}

function getCurrentUrl(){
  return window.location.href.split('?')[0];
}
