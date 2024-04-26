import { act, screen, pause, flushEventsCache } from '@src/base/services/testing';
import analyticsService from '@src/base/services/analytics';
import eventsResource from '@src/events/resources/events';
import eventsMock from '@src/events/mocks/events';
import { init } from '.';

describe('Index', () => {
  function listenWebsiteLoaded(){
    function ListenerData(){
      this.websiteLoadedEventReceived = false;
      this.listener = () => {
        this.websiteLoadedEventReceived = true;
      };
    }
    const listenerData = new ListenerData();
    document.addEventListener('websiteLoaded', listenerData.listener);
    return listenerData;
  }

  function discardWebsiteLoadedListener(listener){
    document.removeEventListener('websiteLoaded', listener);
  }

  beforeEach(() => {
    document.body.innerHTML = '<div data-app></div>';
    analyticsService.init = jest.fn();
    analyticsService.trackPageView = jest.fn();
    eventsResource.get = jest.fn(() => Promise.resolve({ data: eventsMock }));
  });

  afterEach(async () => {
    const container = document.querySelector('[data-app]');
    await new Promise(resolve => {
      setTimeout(() => {
        container.remove();
        resolve();
      });
    });
    flushEventsCache();
  });

  it('should render the website', async () => {
    const listenerData = listenWebsiteLoaded();
    act(() => init());
    const heading = await screen.findByRole('heading', { level: 1, name: 'Veedgee' });
    expect(heading).toBeInTheDocument();
    expect(analyticsService.init).toHaveBeenCalledTimes(1);
    expect(analyticsService.trackPageView).toHaveBeenCalledTimes(1);
    expect(eventsResource.get).toHaveBeenCalledTimes(1);
    await pause();
    expect(listenerData.websiteLoadedEventReceived).toEqual(true);
    discardWebsiteLoadedListener(listenerData.listener);
  });

  it('should dispatch website loaded event even if events fetch fails', async () => {
    eventsResource.get = jest.fn(() => Promise.reject());
    const listenerData = listenWebsiteLoaded();
    act(() => init());
    await pause();
    expect(listenerData.websiteLoadedEventReceived).toEqual(true);
    discardWebsiteLoadedListener(listenerData.listener);
  });
});
