import httpService from './http';

describe('Http Service', () => {
  it('should exported fetch function point to native window fetch function ', () => {
    const params = { some: 'param' };
    window.fetch = jest.fn();
    httpService.fetch(params);
    expect(window.fetch).toHaveBeenCalledWith(params);
  });
});
