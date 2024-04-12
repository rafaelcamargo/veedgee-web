import { act, screen } from '@src/base/services/testing';
import analyticsService from '@src/base/services/analytics';
import { init } from '.';

describe('Index', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div data-app></div>';
    analyticsService.init = jest.fn();
    analyticsService.trackPageView = jest.fn();
  });

  afterEach(async () => {
    const container = document.querySelector('[data-app]');
    await new Promise(resolve => {
      setTimeout(() => {
        container.remove();
        resolve();
      });
    });
  });

  it('should render the website', async () => {
    let websiteLoadedEventReceived;
    document.addEventListener('websiteLoaded', () => {
      websiteLoadedEventReceived = true;
    });
    act(() => init());
    expect(screen.getByRole('heading', { level: 1, name: 'Veedgee' })).toBeInTheDocument();
    expect(analyticsService.init).toHaveBeenCalledTimes(1);
    expect(analyticsService.trackPageView).toHaveBeenCalledTimes(1);
    expect(websiteLoadedEventReceived).toEqual(true);
  });
});
