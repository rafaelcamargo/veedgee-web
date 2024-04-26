import dateService from '@src/base/services/date';
import eventsResource from '@src/events/resources/events';

const _public = {};

const CACHE_KEY = 'vevents';
let currentRequest;

_public.get = () => {
  const cache = getCachedEvents();
  if(currentRequest) return currentRequest;
  if(isCacheValid(cache)) return Promise.resolve(cache.response);
  return storeRequest(eventsResource.get({
    minDate: dateService.buildISOString(dateService.getNow())
  }).then(response => {
    cacheEvents(response);
    currentRequest = null;
    return response;
  }));
};

function storeRequest(request){
  currentRequest = request;
  return currentRequest;
}

function getCachedEvents(){
  const data = window.localStorage.getItem(CACHE_KEY);
  return data && JSON.parse(data);
}

function cacheEvents(response){
  window.localStorage.setItem(CACHE_KEY, JSON.stringify({
    createdAt: getNowTimestamp(),
    response
  }));
}

function isCacheValid(cache){
  const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24;
  return cache && cache.createdAt > getNowTimestamp() - TWENTY_FOUR_HOURS;
}

function getNowTimestamp(){
  return dateService.getNow().getTime();
}

export default _public;
