import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import 'moment-timer';
import { App } from './App';

// mock native timers
jest.useFakeTimers();

test('App sets a 1-second recurring timer', () => {
  // clear previous calls to the mocked timers
  setInterval.mockClear();
  expect(setInterval).not.toHaveBeenCalled();

  // initiate the component
  shallow(<App />);

  expect(setInterval).toHaveBeenCalledTimes(1);
  expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
});

describe('App gets the current', () => {
  test('time as HH:MM AM/PM', () => {
    const timeWithoutSeconds = App.prototype.getCurrentTime(false);

    // moment returns nicely formatted time strings
    const timeFromMoment = moment().format(`hh:mm A`);
    expect(timeWithoutSeconds).toEqual(timeFromMoment);
  });

  test('time as HH:MM:SS AM/PM', () => {
    const timeWithSeconds = App.prototype.getCurrentTime();

    const timeFromMoment = moment().format(`hh:mm:ss A`);
    expect(timeWithSeconds).toEqual(timeFromMoment);
  });

  test('hour in 24-hour format', () => {
    const hour = App.prototype.getCurrentHour();

    const timeFromMoment = Number(moment().format(`HH`));
    expect(hour).toEqual(timeFromMoment);
  });

  test('date as YYYY M D', () => {
    const date = App.prototype.getCurrentDate();

    const timeFromMoment = moment().format(`YYYY M D`);
    expect(date).toEqual(timeFromMoment);
  });
});

test('App gets the correct background color', () => {
  expect(App.prototype.getBackground).toBeDefined();

  const dayBkrgnd = 'light-1';
  const nightBkgrnd = 'dark-1';
  expect(App.prototype.getBackground(10)).toEqual(dayBkrgnd);
  expect(App.prototype.getBackground(22)).toEqual(nightBkgrnd);
});

test('App gets the correct spinner color', () => {
  expect(App.prototype.getSpinnerColor).toBeDefined();

  const nightColor = '#F8F8F8';
  const dayColor = '#333333';
  expect(App.prototype.getSpinnerColor(10)).toEqual(dayColor);
  expect(App.prototype.getSpinnerColor(22)).toEqual(nightColor);
});
