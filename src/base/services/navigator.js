const _public = {};

_public.isServiceWorkersAvailable = () => !!getServiceWorkerAPI();

_public.registerServiceWorker = filepath => getServiceWorkerAPI().register(filepath);

_public.isOnline = () => navigator.onLine;

function getServiceWorkerAPI(){
  return navigator.serviceWorker;
}

export default _public;
