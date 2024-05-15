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

  it('should answer if a date is today', () => {
    const today = new Date(2024, 4, 14, 23, 59, 59);
    dateService.getNow = jest.fn(() => today);
    expect(dateService.isToday('2024-05-14')).toEqual(true);
  });

  it('should answer if a date is tomorrow', () => {
    const today = new Date(2024, 4, 14, 23, 59, 59);
    dateService.getNow = jest.fn(() => today);
    expect(dateService.isTomorrow('2024-05-15')).toEqual(true);
  });
});
