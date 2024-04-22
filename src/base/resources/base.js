import httpService from '@src/base/services/http';

const _public = {};

_public.get = (url, params) => {
  return request(buildFullUrl(url, params));
};

function request(url) {
  return httpService.fetch(url).then(async response => {
    const data = await response.json();
    return {
      headers: response.headers,
      status: response.status,
      data
    };
  });
}

function buildFullUrl(baseUrl, queryParams){
  const fullUrl = new URL(baseUrl);
  if(queryParams) fullUrl.search = new URLSearchParams(queryParams);
  return fullUrl.toString();
}

export default _public;
