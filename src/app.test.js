import Staly from '@compilorama/staly';
import { StalyMock, stalyInstanceMock } from '@src/base/mocks/staly';
import { asyncMount, screen, getTranslations, mockSearchParams } from '@src/base/services/testing';
import analyticsService from '@src/base/services/analytics';
import homeViewTranslations from '@src/home/views/home-view.trans.json';
import { App } from './app';

jest.mock('@compilorama/staly');
Staly.mockImplementation(StalyMock);

describe('App', () => {
  async function mount(){
    return await asyncMount(<App />);
  }

  beforeEach(() => {
    analyticsService.init();
  });

  afterEach(() => {
    mockSearchParams('');
    localStorage.removeItem('vlocale');
  });

  it('should contain a homepage', async () => {
    await mount();
    const { find_events } = getTranslations(homeViewTranslations);
    const heading = await screen.findByRole('heading', { level: 2, name: find_events });
    expect(heading).toBeInTheDocument();
    expect(stalyInstanceMock.trackPageview).toHaveBeenCalledTimes(1);
  });

  it('should optionally set locale according "lang" search param found on url', async () => {
    mockSearchParams('locale=pt-BR');
    await mount();
    const { find_events } = homeViewTranslations['pt-BR'];
    const heading = await screen.findByRole('heading', { level: 2, name: find_events });
    expect(heading).toBeInTheDocument();
  });

  it('should optionally set locale according language stored on local storage', async () => {
    localStorage.setItem('vlocale', 'pt-BR');
    await mount();
    const { find_events } = homeViewTranslations['pt-BR'];
    const heading = await screen.findByRole('heading', { level: 2, name: find_events });
    expect(heading).toBeInTheDocument();
  });
});
