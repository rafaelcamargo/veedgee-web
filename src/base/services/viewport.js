const _public = {};

_public.getWidth = () => window.innerWidth;

_public.listenResize = listener => window.addEventListener('resize', listener);

_public.unlistenResize = listener => window.removeEventListener('resize', listener);

export default _public;
