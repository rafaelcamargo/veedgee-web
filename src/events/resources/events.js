import ENV from '@environment';
import baseResource from '@src/base/resources/base';

const _public = {};

_public.get = params => {
  return baseResource.get(buildBaseUrl(), params);
};

function buildBaseUrl(){
  return `${ENV.VEEDGEE_API_BASE_URL}/events`;
}

export default _public;
