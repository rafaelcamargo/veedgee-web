import { flushEventsCache } from '@src/base/services/testing';
import eventsResource from '@src/events/resources/events';
import dateService from '@src/base/services/date';
import eventsService from '@src/events/services/events';
import eventsMock from '@src/events/mocks/events';

describe('Events Service', () => {
  function buildNowDateISOString(){
    const date = new Date();
    return date.toISOString().split('T')[0];
  }

  beforeEach(() => {
    eventsResource.get = jest.fn(() => Promise.resolve({ data: eventsMock }));
  });

  afterEach(() => {
    flushEventsCache();
  });

  it('should fetch today\'s events onwards and cache them', async () => {
    const response = await eventsService.get();
    expect(eventsResource.get).toHaveBeenCalledWith({ minDate: buildNowDateISOString() });
    expect(response).toEqual({ data: eventsMock });
    expect(JSON.parse(window.localStorage.getItem('vevents'))).toEqual({
      createdAt: expect.any(Number),
      response: { data: eventsMock }
    });
  });

  it('should optionally respond with cached events if cache is newer than 24h', async () => {
    dateService.getNow = jest.fn(() => new Date(2024, 3, 26, 10, 0));
    const createdAt = new Date(2024, 3, 25, 10, 30);
    const cache = { createdAt: createdAt.getTime(), response: { data: eventsMock } };
    window.localStorage.setItem('vevents', JSON.stringify(cache));
    const response = await eventsService.get();
    expect(eventsResource.get).not.toHaveBeenCalled();
    expect(response).toEqual({ data: eventsMock });
  });

  it('should refetch events if cache is older than 24h', async () => {
    dateService.getNow = jest.fn(() => new Date(2024, 3, 26, 10, 0));
    const createdAt = new Date(2024, 3, 25, 9, 59);
    const cache = { createdAt: createdAt.getTime(), response: { data: eventsMock } };
    window.localStorage.setItem('vevents', JSON.stringify(cache));
    const response = await eventsService.get();
    expect(eventsResource.get).toHaveBeenCalledWith({ minDate: buildNowDateISOString() });
    expect(response).toEqual({ data: eventsMock });
  });

  it('should not fetch events more than once simultaneously', async () => {
    const responses = await Promise.all([
      eventsService.get(),
      eventsService.get(),
      eventsService.get()
    ]);
    const expectedResponse = { data: eventsMock };
    expect(eventsResource.get).toHaveBeenCalledTimes(1);
    expect(responses[0]).toEqual(expectedResponse);
    expect(responses[1]).toEqual(expectedResponse);
    expect(responses[2]).toEqual(expectedResponse);
  });
});