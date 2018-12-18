import React from 'react';
import App from './App';
import TestRenderer from 'react-test-renderer';

const mockDay = {
  sleepTime: '10:30 PM',
  wakeTime: '06:00 AM',
  getUpTime: '06:30 AM'
};
const dateWithData = '2018 10 6';
const dateWithoutData = '2018 4 2';

afterEach(() => {
  if (localStorage.getItem('dates') !== null) localStorage.removeItem('dates');
});

describe('From localStorage, App gets', () => {
  test('the same times it saves to localStorage', () => {
    App.prototype.saveTimesToLocalStorage(dateWithData, mockDay);
    const {
      sleepTime,
      wakeTime,
      getUpTime
    } = App.prototype.getTimesFromLocalStorage(dateWithData);

    expect(sleepTime).toEqual(mockDay.sleepTime);
    expect(wakeTime).toEqual(mockDay.wakeTime);
    expect(getUpTime).toEqual(mockDay.getUpTime);
  });

  test('empty strings for dates with no saved records', () => {
    const {
      sleepTime,
      wakeTime,
      getUpTime
    } = App.prototype.getTimesFromLocalStorage(dateWithoutData);

    expect(sleepTime).toEqual('');
    expect(wakeTime).toEqual('');
    expect(getUpTime).toEqual('');
  });
});
