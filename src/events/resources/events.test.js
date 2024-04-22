import ENV from '@environment';
import baseResource from '@src/base/resources/base';
import eventsResource from './events';

describe('Events Resource', () => {
  beforeEach(() => {
    baseResource.get = jest.fn();
  });

  it('should get events', async () => {
    eventsResource.get();
    expect(baseResource.get).toHaveBeenCalledWith(`${ENV.VEEDGEE_API_BASE_URL}/events`, undefined);
  });

  it('should optionally get events passing filters', async () => {
    const filters = { minDate: '2024-02-20' };
    eventsResource.get(filters);
    expect(baseResource.get).toHaveBeenCalledWith(`${ENV.VEEDGEE_API_BASE_URL}/events`, filters);
  });
});
