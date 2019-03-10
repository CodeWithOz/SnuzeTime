import moment from 'moment';
import { getCurrentHour } from './timeFuncs';

describe('Module exposes', () => {
  describe('getCurrentHour which', () => {
    test('is a function', () => {
      expect(typeof getCurrentHour).toEqual('function');
    });

    test('returns current hour in 24-hour format', () => {
      const hour = getCurrentHour();

      const timeFromMoment = Number(moment().format(`HH`));
      expect(hour).toEqual(timeFromMoment);
    });
  });
});
