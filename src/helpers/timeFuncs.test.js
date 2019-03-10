import { getCurrentHour } from './timeFuncs';

describe('Module exposes', () => {
  describe('getCurrentHour which', () => {
    test('is a function', () => {
      expect(typeof getCurrentHour).toEqual('function');
    });
  });
});
