import pwaService from './pwa';

describe('PWA Service', () => {
  it('should build manifest in english if no locale has been given', () => {
    expect(pwaService.buildManifestByLocale()).toEqual({
      lang: 'en-US',
      id: '/?veedgee',
      dir: 'ltr',
      name: 'Veedgee',
      short_name: 'Veedgee',
      description: 'Discover the best events in the South of Brazil.',
      display: 'standalone',
      orientation: 'natural',
      background_color: '#FBFBFB',
      theme_color: '#FBFBFB',
      scope: '/',
      start_url: '/events?ref=pwa',
      icons: [
        {
          src: '/assets/images/favicon_veedgee_48x48.png',
          type: 'image/png',
          sizes: '48x48'
        },
        {
          src: '/assets/images/favicon_veedgee_72x72.png',
          type: 'image/png',
          sizes: '72x72'
        },
        {
          src: '/assets/images/favicon_veedgee_96x96.png',
          type: 'image/png',
          sizes: '96x96'
        },
        {
          src: '/assets/images/favicon_veedgee_128x128.png',
          type: 'image/png',
          sizes: '128x128'
        },
        {
          src: '/assets/images/favicon_veedgee_144x144.png',
          type: 'image/png',
          sizes: '144x144'
        },
        {
          src: '/assets/images/favicon_veedgee_192x192.png',
          type: 'image/png',
          sizes: '192x192'
        },
        {
          src: '/assets/images/favicon_veedgee_256x256.png',
          type: 'image/png',
          sizes: '256x256'
        },
        {
          src: '/assets/images/favicon_veedgee_512x512.png',
          type: 'image/png',
          sizes: '512x512'
        },
        {
          src: '/assets/images/favicon_veedgee_512x512_maskable.png',
          type: 'image/png',
          sizes: '512x512',
          purpose: 'maskable'
        }
      ],
      screenshots: [
        {
          src: '/assets/images/banner_veedgee_1270x760_02_en.png',
          type: 'image/png',
          sizes: '1270x760',
          form_factor: 'wide'
        },
        {
          'src': '/assets/images/banner_veedgee_760x1270_02_en.png',
          'type': 'image/png',
          'sizes': '760x1270'
        },
        {
          src: '/assets/images/banner_veedgee_1270x760_03_en.png',
          type: 'image/png',
          sizes: '1270x760',
          form_factor: 'wide'
        },
        {
          'src': '/assets/images/banner_veedgee_760x1270_03_en.png',
          'type': 'image/png',
          'sizes': '760x1270'
        }
      ]
    });
  });

  it('should build manifest according locale given', () => {
    expect(pwaService.buildManifestByLocale('pt-BR')).toEqual({
      lang: 'pt-BR',
      id: '/?veedgee',
      dir: 'ltr',
      name: 'Veedgee',
      short_name: 'Veedgee',
      description: 'Descubra o que de melhor acontece no Sul do Brasil.',
      display: 'standalone',
      orientation: 'natural',
      background_color: '#FBFBFB',
      theme_color: '#FBFBFB',
      scope: '/',
      start_url: '/events?ref=pwa&locale=pt-BR',
      icons: [
        {
          src: '/assets/images/favicon_veedgee_48x48.png',
          type: 'image/png',
          sizes: '48x48'
        },
        {
          src: '/assets/images/favicon_veedgee_72x72.png',
          type: 'image/png',
          sizes: '72x72'
        },
        {
          src: '/assets/images/favicon_veedgee_96x96.png',
          type: 'image/png',
          sizes: '96x96'
        },
        {
          src: '/assets/images/favicon_veedgee_128x128.png',
          type: 'image/png',
          sizes: '128x128'
        },
        {
          src: '/assets/images/favicon_veedgee_144x144.png',
          type: 'image/png',
          sizes: '144x144'
        },
        {
          src: '/assets/images/favicon_veedgee_192x192.png',
          type: 'image/png',
          sizes: '192x192'
        },
        {
          src: '/assets/images/favicon_veedgee_256x256.png',
          type: 'image/png',
          sizes: '256x256'
        },
        {
          src: '/assets/images/favicon_veedgee_512x512.png',
          type: 'image/png',
          sizes: '512x512'
        },
        {
          src: '/assets/images/favicon_veedgee_512x512_maskable.png',
          type: 'image/png',
          sizes: '512x512',
          purpose: 'maskable'
        }
      ],
      screenshots: [
        {
          src: '/assets/images/banner_veedgee_1270x760_02_pt.png',
          type: 'image/png',
          sizes: '1270x760',
          form_factor: 'wide'
        },
        {
          'src': '/assets/images/banner_veedgee_760x1270_02_pt.png',
          'type': 'image/png',
          'sizes': '760x1270'
        },
        {
          src: '/assets/images/banner_veedgee_1270x760_03_pt.png',
          type: 'image/png',
          sizes: '1270x760',
          form_factor: 'wide'
        },
        {
          'src': '/assets/images/banner_veedgee_760x1270_03_pt.png',
          'type': 'image/png',
          'sizes': '760x1270'
        }
      ]
    });
  });
});
