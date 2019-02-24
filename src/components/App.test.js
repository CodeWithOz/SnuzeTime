import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import 'moment-timer';
import { App, appConfig } from './App';
import Sidebar from './Sidebar';
import SplashScreen from './SplashScreen';

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

describe('App sets breakpoint for', () => {
  test('small @ 576px', () => {
    const { value } = appConfig.customTheme.global.breakpoints.small;
    expect(value).toEqual(576);
  });

  test('medium @ 768px', () => {
    const { value } = appConfig.customTheme.global.breakpoints.medium;
    expect(value).toEqual(768);
  });

  test('large @ 992px', () => {
    const { value } = appConfig.customTheme.global.breakpoints.large;
    expect(value).toEqual(992);
  });

  test('xlarge higher than large', () => {
    const { xlarge } = appConfig.customTheme.global.breakpoints;

    // empty object is used to signal everything higher
    // as seen in the source code
    // https://github.com/grommet/grommet/blob/9eed6e5954e2997c4191b079d5ff6d604db178a9/src/js/themes/base.js#L154
    expect(xlarge).toEqual({});
  });
});

describe('App', () => {
  let props;

  beforeEach(() => {
    props = {
      currentTimes: {
        withSeconds: '',
        withoutSeconds: '',
        hour: 1,
        date: '9999 9 9'
      }
    };
  });

  describe('when shown', () => {
    beforeEach(() => {
      props = { ...props, mainAppShown: true };
    });

    test('renders a Sidebar component', () => {
      const wrapper = shallow(<App {...props} />, {
        context: { size: 'small' }
      });
      expect(wrapper.find(Sidebar).length).toEqual(1);
    });
  });

  describe('when not shown', () => {
    beforeEach(() => {
      props = { ...props, mainAppShown: false };
    });

    test('renders a SplashScreen component', () => {
      const wrapper = shallow(<App {...props} />, {
        context: { size: 'small' }
      });
      expect(wrapper.find(SplashScreen).length).toEqual(1);
    });
  });

  describe('exposes renderMainApp which', () => {
    // the method is saved in a property as an arrow function to bind 'this'
    // it is therefore not on the prototype and must be reached from a
    // shallow render of the component
    test('is a function', () => {
      const wrapper = shallow(<App {...props} />);
      expect(typeof wrapper.instance().renderMainApp).toEqual('function');
    });

    test('is called when App is shown', () => {
      const editedProps = { ...props, mainAppShown: false };
      const wrapper = shallow(<App {...editedProps} />);
      const spy = jest.spyOn(wrapper.instance(), 'renderMainApp');
      expect(spy).not.toHaveBeenCalled();

      wrapper.setProps({ mainAppShown: true });
      expect(spy).toHaveBeenCalledTimes(1);

      spy.mockRestore();
    });
  });

  describe('exposes setHour which', () => {
    // the method is saved in a property as an arrow function to bind 'this'
    // it is therefore not on the prototype and must be reached from a
    // shallow render of the component
    test('is a function', () => {
      expect(typeof App.prototype.setHour).toEqual('function');
    });
  });
});
