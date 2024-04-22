import dateService from './date';

describe('Date Service', () => {
  it('should build a date representing now', () => {
    const now = new Date();
    const serviceNow = dateService.getNow();
    expect(serviceNow.getFullYear()).toEqual(now.getFullYear());
    expect(serviceNow.getMonth()).toEqual(now.getMonth());
    expect(serviceNow.getDate()).toEqual(now.getDate());
    expect(serviceNow.getHours()).toEqual(now.getHours());
    expect(serviceNow.getMinutes()).toEqual(now.getMinutes());
    expect(serviceNow.getSeconds()).toEqual(now.getSeconds());
  });
});
