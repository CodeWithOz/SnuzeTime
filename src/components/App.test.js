import React from 'react';
import App from './App';
import TestRenderer from 'react-test-renderer';

describe('App.getTodaysTimes()', () => {
  const mockDay = {
    sleepTime: '10:30 PM',
    wakeTime: '06:00 AM',
    getUpTime: '06:30 AM'
  };
  const mockOctober = new Map([['6', mockDay]]); // October 6
  const mock2018 = new Map([['10', mockOctober]]);
  const mockStore = new Map([['2018', mock2018]]);
  const dateWithData = '2018 10 6';
  const dateWithoutData = '2018 4 2';

  test(`returns an object with 'sleepTime', 'wakeTime' and 'getUpTime' properties`, () => {
    const result = App.prototype.getTodaysTimes(dateWithoutData, mockStore);
    expect(result.hasOwnProperty('sleepTime')).toBe(true);
    expect(result.hasOwnProperty('wakeTime')).toBe(true);
    expect(result.hasOwnProperty('getUpTime')).toBe(true);
  });

  test('returns empty strings if supplied date has no data', () => {
    const { sleepTime, wakeTime, getUpTime } = App.prototype.getTodaysTimes(
      dateWithoutData,
      mockStore
    );
    expect(sleepTime).toEqual('');
    expect(wakeTime).toEqual('');
    expect(getUpTime).toEqual('');
  });

  test('returns correct info if supplied date has data', () => {
    const { sleepTime, wakeTime, getUpTime } = App.prototype.getTodaysTimes(
      dateWithData,
      mockStore
    );
    expect(sleepTime).toEqual(mockDay.sleepTime);
    expect(wakeTime).toEqual(mockDay.wakeTime);
    expect(getUpTime).toEqual(mockDay.getUpTime);
  });
});
