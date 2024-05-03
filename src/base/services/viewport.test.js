import viewportService from './viewport';

describe('Viewport Service', () => {
  it('should get viewport width', () => {
    expect(viewportService.getWidth()).toEqual(window.innerWidth);
  });
});
