import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import 'moment-timer';
import { RotateSpinLoader } from 'react-css-loaders';
import { Today } from './Today';

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

describe('Today', () => {
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

  describe('exposes renderToday which', () => {
    // the method is saved in a property as an arrow function to bind 'this'
    // it is therefore not on the prototype and must be reached from a
    // shallow render of the component
    test('is a function', () => {
      const wrapper = shallow(<Today {...props} />);
      expect(typeof wrapper.instance().renderToday).toEqual('function');
    });

    test('is called when Today is shown', () => {
      const wrapper = shallow(<Today {...props} />);
      const spy = jest.spyOn(wrapper.instance(), 'renderToday');
      wrapper.setState({ shown: false });
      expect(spy).not.toHaveBeenCalled();

      wrapper.setState({ shown: true });
      expect(spy).toHaveBeenCalledTimes(1);

      spy.mockRestore();
    });
  });

  describe('exposes getSpinnerColor which', () => {
    test('is a function', () => {
      expect(typeof Today.prototype.getSpinnerColor).toEqual('function');
    });

    test('gets the correct spinner color', () => {
      const nightColor = '#F8F8F8';
      const dayColor = '#333333';
      expect(Today.prototype.getSpinnerColor(10)).toEqual(dayColor);
      expect(Today.prototype.getSpinnerColor(22)).toEqual(nightColor);
    });
  });

  describe('when loading', () => {
    let editedProps;

    beforeEach(() => {
      editedProps = { ...props, mainAppShown: false };
    });

    test('displays a loading spinner', () => {
      const wrapper = shallow(<Today {...editedProps} />);
      expect(wrapper.find(RotateSpinLoader).length).toEqual(1);
    });

    test('displays a loading spinner with the correct color', () => {
      const expectedColor = Today.prototype.getSpinnerColor(editedProps.hour);
      const loader = shallow(<Today {...editedProps} />)
        .find(RotateSpinLoader)
        .at(0);
      expect(loader.props().color).toEqual(expectedColor);
    });
  });
});
