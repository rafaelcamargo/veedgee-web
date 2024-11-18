import { asyncMount, screen, getTranslations, mockSearchParams } from '@src/base/services/testing';
import dateService from '@src/base/services/date';
import eventsMock from '@src/events/mocks/events';
import eventsResource from '@src/events/resources/events';
import homeViewTranslations from '@src/home/views/home-view.trans.json';
import { App } from './app';

describe('App', () => {
  async function mount(){
    return await asyncMount(<App />);
  }

  function setRoute(routePathname){
    window.history.pushState({}, '', routePathname);
  }

  beforeEach(() => {
    eventsResource.get = jest.fn(() => Promise.resolve({ data: eventsMock }));
  });

  afterEach(() => {
    setRoute('/');
    mockSearchParams('');
    localStorage.removeItem('vlocale');
  });

  it('should contain a homepage', async () => {
    await mount();
    const { find_events } = getTranslations(homeViewTranslations);
    const heading = await screen.findByRole('heading', { level: 2, name: find_events });
    expect(heading).toBeInTheDocument();
  });

  it('should contain an events view', async () => {
    dateService.getNow = jest.fn(() => new Date(2024, 2, 23));
    setRoute('/events');
    await mount();
    const firstEventHeading = await screen.findByRole('heading', { level: 2, name: eventsMock[0].title });
    expect(firstEventHeading).toBeInTheDocument();
  });

  it('should contain an installation view', async () => {
    setRoute('/install');
    await mount();
    const heading = await screen.findByRole('heading', { level: 1, name: 'Installation' });
    expect(heading).toBeInTheDocument();
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
