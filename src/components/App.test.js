import React from 'react';
import App from './App';
import TestRenderer from 'react-test-renderer';
import theme from '../helpers/theme';

describe('From localStorage, App gets', () => {
  const mockDay = {
    sleepTime: '10:30 PM',
    wakeTime: '06:00 AM',
    getUpTime: '06:30 AM'
  };
  const dateWithData = '2018 10 6';
  const dateWithoutData = '2018 4 2';

  afterEach(() => {
    if (localStorage.getItem('dates') !== null)
      localStorage.removeItem('dates');
  });

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

test('App can get a theme object for Grommet', () => {
  expect(App.prototype.getTheme).toBeDefined();
  const themeSpy = jest.spyOn(theme, 'get');

  // verify that theme has not been called yet
  expect(themeSpy).not.toHaveBeenCalled();

  expect(App.prototype.getTheme().global.colors.bkgrnd).toBeDefined();
  expect(themeSpy).toHaveBeenCalledTimes(1);

  themeSpy.mockRestore();
});
