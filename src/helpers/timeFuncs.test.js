import moment from 'moment';
import { getCurrentHour, getCurrentDate } from './timeFuncs';

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

  describe('getCurrentDate which', () => {
    test('is a function', () => {
      expect(typeof getCurrentDate).toEqual('function');
    });
  });
});
