import windowService from './window';

describe('Window Service', () => {
  it('should return user agent', () => {
    expect(windowService.getUserAgent()).toEqual(window.navigator.userAgent);
  });
});
