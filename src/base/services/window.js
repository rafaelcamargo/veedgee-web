const _public = {};

_public.getUserAgent = () => window.navigator.userAgent;

_public.getSearchParam = paramName => {
  const params = new URLSearchParams(window.location.search);
  return params.get(paramName);
};

export default _public;
