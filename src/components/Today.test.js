import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import 'moment-timer';
import { Today, todayConfig } from './Today';

// mock native timers
jest.useFakeTimers();

test('Today sets a 1-second recurring timer', () => {
  // clear previous calls to the mocked timers
  setInterval.mockClear();
  expect(setInterval).not.toHaveBeenCalled();

  // initiate the component
  shallow(<Today />);

  expect(setInterval).toHaveBeenCalledTimes(1);
  expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
});

describe('Today gets the current', () => {
  test('time as HH:MM AM/PM', () => {
    const timeWithoutSeconds = Today.prototype.getCurrentTime(false);

    // moment returns nicely formatted time strings
    const timeFromMoment = moment().format(`hh:mm A`);
    expect(timeWithoutSeconds).toEqual(timeFromMoment);
  });

  test('time as HH:MM:SS AM/PM', () => {
    const timeWithSeconds = Today.prototype.getCurrentTime();

    const timeFromMoment = moment().format(`hh:mm:ss A`);
    expect(timeWithSeconds).toEqual(timeFromMoment);
  });

  test('hour in 24-hour format', () => {
    const hour = Today.prototype.getCurrentHour();

    const timeFromMoment = Number(moment().format(`HH`));
    expect(hour).toEqual(timeFromMoment);
  });

  test('date as YYYY M D', () => {
    const date = Today.prototype.getCurrentDate();

    const timeFromMoment = moment().format(`YYYY M D`);
    expect(date).toEqual(timeFromMoment);
  });
});

test('Today gets the correct background color', () => {
  expect(Today.prototype.getBackground).toBeDefined();

  const dayBkrgnd = 'light-1';
  const nightBkgrnd = 'dark-1';
  expect(Today.prototype.getBackground(10)).toEqual(dayBkrgnd);
  expect(Today.prototype.getBackground(22)).toEqual(nightBkgrnd);
});

describe('Today sets breakpoint for', () => {
  test('small @ 576px', () => {
    const { value } = todayConfig.customTheme.global.breakpoints.small;
    expect(value).toEqual(576);
  });

  test('medium @ 768px', () => {
    const { value } = todayConfig.customTheme.global.breakpoints.medium;
    expect(value).toEqual(768);
  });

  test('large @ 992px', () => {
    const { value } = todayConfig.customTheme.global.breakpoints.large;
    expect(value).toEqual(992);
  });

  test('xlarge higher than large', () => {
    const { xlarge } = todayConfig.customTheme.global.breakpoints;

    // empty object is used to signal everything higher
    // as seen in the source code
    // https://github.com/grommet/grommet/blob/9eed6e5954e2997c4191b079d5ff6d604db178a9/src/js/themes/base.js#L154
    expect(xlarge).toEqual({});
  });
});

describe('Today', () => {
  let props;

  beforeEach(() => {
    props = {
      currentTimes: {
        withSeconds: '',
        withoutSeconds: '',
        hour: 1,
        date: '9999 9 9'
      },
      mainAppShown: true
    };
  });

  describe('exposes renderToday which', () => {
    // the method is saved in a property as an arrow function to bind 'this'
    // it is therefore not on the prototype and must be reached from a
    // shallow render of the component
    test('is a function', () => {
      const wrapper = shallow(<Today {...props} />);
      expect(typeof wrapper.instance().renderToday).toEqual('function');
    });

    test('is called when Today is shown', () => {
      const editedProps = { ...props, mainAppShown: false };
      const wrapper = shallow(<Today {...editedProps} />);
      const spy = jest.spyOn(wrapper.instance(), 'renderToday');
      expect(spy).not.toHaveBeenCalled();

      wrapper.setProps({ mainAppShown: true });
      expect(spy).toHaveBeenCalledTimes(1);

      spy.mockRestore();
    });
  });
});
