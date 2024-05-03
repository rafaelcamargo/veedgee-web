const _public = {};

_public.getCities = getCities;

_public.getCityCode = cityName => {
  const city = getCities().find(({ name }) => name === cityName);
  return city?.code;
};

function getCities(){
  return [
    { code: 'balneario-camboriu', name: 'Balneário Camboriú' },
    { code: 'blumenau', name: 'Blumenau' },
    { code: 'curitiba', name: 'Curitiba' },
    { code: 'florianopolis', name: 'Florianópolis' },
    { code: 'itajai', name: 'Itajaí' },
    { code: 'joinville', name: 'Joinville' },
    { code: 'porto-alegre', name: 'Porto Alegre' },
    { code: 'sao-jose', name: 'São José' }
  ];
}

export default _public;
