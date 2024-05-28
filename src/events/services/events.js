import dateService from '@src/base/services/date';
import eventsResource from '@src/events/resources/events';
import navigatorService from '@src/base/services/navigator';

const _public = {};

const CACHE_KEY = 'vevents';
let currentRequest;

_public.get = () => {
  const cache = getCachedEvents();
  if(currentRequest) return currentRequest;
  if(isCacheValid(cache)) return Promise.resolve(removePastEvents(cache.response));
  return storeRequest(eventsResource.get({
    minDate: buildNowDateISOString()
  }).then(response => {
    cacheEvents(response);
    return response;
  })).finally(() => {
    currentRequest = null;
  });
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
  const TWELVE_HOURS = 1000 * 60 * 60 * 12;
  return !navigatorService.isOnline() || (cache && cache.createdAt > getNowTimestamp() - TWELVE_HOURS);
}

function getNowTimestamp(){
  return dateService.getNow().getTime();
}

function removePastEvents(response){
  const todayISOString = buildNowDateISOString();
  return {
    ...response,
    data: response.data.filter(event => event.date >= todayISOString)
  };
}

function buildNowDateISOString(){
  return dateService.getTodayISOString();
}

export default _public;
