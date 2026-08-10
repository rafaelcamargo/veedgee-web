const _public = {};

_public.getImagesPath = () => '/assets/images';

_public.isValidSrc = src => encodeURI(src) === src;

export default _public;
