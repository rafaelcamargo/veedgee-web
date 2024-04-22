import httpService from '@src/base/services/http';
import baseResource from './base';

describe('Base Resource', () => {
  function mockRequestResponse(expectedUrl, { headers, status, data }){
    httpService.fetch = jest.fn((url) => {
      return url === expectedUrl && Promise.resolve({
        status,
        headers: mapHeaders(headers),
        json: () => Promise.resolve(data)
      });
    });
  }

  function mapHeaders(headers = {}){
    const result = new Map();
    Object.entries(headers).map(([key, value]) => result.set(key, value));
    return result;
  }

  it('should make a get request handling JSON as response type', async () => {
    const url = 'https://some.url.com/';
    const data = { some: 'json' };
    mockRequestResponse(url, { headers: { 'content-type': 'application/json'}, status: 200, data});
    const response = await baseResource.get(url);
    expect(response.status).toEqual(200);
    expect(response.data).toEqual(data);
  });

  it('should optionally make a get request using query params', async () => {
    const url = 'https://some.url.com/';
    const params = { slug: 'my-event-123' };
    mockRequestResponse(`${url}?slug=${params.slug}`, { headers: { 'content-type': 'application/json'}, status: 200, data: {}});
    await baseResource.get(url, params);
    expect(httpService.fetch).toHaveBeenCalledWith(`${url}?slug=${params.slug}`);
  });
});
