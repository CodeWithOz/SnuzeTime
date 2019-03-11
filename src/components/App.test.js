import React from 'react';
import { shallow } from 'enzyme';
import 'moment-timer';
import { HashRouter } from 'react-router-dom';
import { App, appConfig } from './App';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Main from './Main';
import SplashScreen from './SplashScreen';
import timeFuncs from '../helpers/timeFuncs';

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
  let props, updateCurrentTimesMock, showMainAppMock;

  beforeEach(() => {
    showMainAppMock = jest.fn();
    updateCurrentTimesMock = jest.fn();

    props = {
      currentTimes: {
        withSeconds: '',
        withoutSeconds: '',
        hour: 1,
        date: '9999 9 9'
      },
      updateCurrentTimes: updateCurrentTimesMock,
      showMainApp: showMainAppMock
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

    test('renders a Navbar component', () => {
      const wrapper = shallow(<App {...props} />, {
        context: { size: 'small' }
      });
      expect(wrapper.find(Navbar).length).toEqual(1);
    });

    test('renders a Main component', () => {
      const wrapper = shallow(<App {...props} />, {
        context: { size: 'small' }
      });
      expect(wrapper.find(Main).length).toEqual(1);
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

    test('updates the currentTimes state with the current hour and date', () => {
      expect(updateCurrentTimesMock).not.toHaveBeenCalled();

      const setHourSpy = jest.spyOn(App.prototype, 'setHour');
      expect(setHourSpy).not.toHaveBeenCalled();
      const getCurrentHourSpy = jest.spyOn(timeFuncs, 'getCurrentHour');
      expect(getCurrentHourSpy).not.toHaveBeenCalled();
      const getCurrentDateSpy = jest.spyOn(timeFuncs, 'getCurrentDate');
      expect(getCurrentDateSpy).not.toHaveBeenCalled();

      shallow(<App {...props} />);
      expect(setHourSpy).toHaveBeenCalled();
      expect(updateCurrentTimesMock).toHaveBeenCalled();
      expect(getCurrentHourSpy).toHaveBeenCalled();
      expect(getCurrentDateSpy).toHaveBeenCalled();

      setHourSpy.mockRestore();
      getCurrentHourSpy.mockRestore();
      getCurrentDateSpy.mockRestore();
    });
  });

  test('renders a HashRouter from react-router', () => {
    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find(HashRouter).length).toEqual(1);
  });
});
