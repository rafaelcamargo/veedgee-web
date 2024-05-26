const routes = require('./src/routes');

const _public = {};

_public.getRoutes = () => {
  const paths = getRoutePaths();
  return paths.map(path => `${path}?prerender=true&analytics=disabled`);
};

function getRoutePaths(){
  return routes.reduce((result, route) => {
    return route.prerender ? [...result, route.path] : result;
  }, []);
}

module.exports = _public;
