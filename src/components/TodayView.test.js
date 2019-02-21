import React from 'react';
import { shallow, mount } from 'enzyme';
import moment from 'moment';
import { RotateSpinLoader } from 'react-css-loaders';
import { TodayView } from './TodayView';
import dateStore from '../helpers/dateStore';

let props;

beforeEach(() => {
  props = {
    wakeTime: '',
    getUpTime: '',
    shown: true,
    date: '9999 9 9',
    hour: 10,
    updateSnuzeTimes: jest.fn(),
    showTodayView: jest.fn()
  };
});

describe('When shown, TodayView displays', () => {
  const defaultTexts = {
    wake: `...haven't woken up.`,
    getUp: `...haven't gotten out of bed.`
  };

  test('default text when empty strings are supplied', () => {
    const wrapper = shallow(<TodayView {...props} />);

    // convert object representation to string for easier matching
    const todayViewAsString = wrapper.render().text();

    expect(todayViewAsString).toContain(defaultTexts.wake);
    expect(todayViewAsString).toContain(defaultTexts.getUp);
  });

  test('supplied text instead of default text', () => {
    const editedProps = {
      ...props,
      wakeTime: '05:45 AM',
      getUpTime: '05:50 AM'
    };

    const wrapper = shallow(<TodayView {...editedProps} />);

    // convert object representation to string for easier matching
    const todayViewAsString = wrapper.render().text();

    expect(todayViewAsString).toContain(editedProps.wakeTime);
    expect(todayViewAsString).toContain(editedProps.getUpTime);
    expect(todayViewAsString).not.toContain(defaultTexts.wake);
    expect(todayViewAsString).not.toContain(defaultTexts.getUp);
  });
});

describe('From localStorage, TodayView gets', () => {
  const mockDay = {
    wakeTime: '06:00 AM',
    getUpTime: '06:30 AM'
  };
  const dateWithData = '2018 10 6';
  const dateWithoutData = '2018 4 2';

  beforeEach(() => {
    dateStore.addTimesToLocalStorage(dateWithData, mockDay);
  });

  afterEach(() => {
    if (localStorage.getItem('dates') !== null)
      localStorage.removeItem('dates');
  });

  test('correct times for dates with saved records', () => {
    const {
      wakeTime,
      getUpTime
    } = TodayView.prototype.getTimesFromLocalStorage(dateWithData);

    expect(wakeTime).toEqual(mockDay.wakeTime);
    expect(getUpTime).toEqual(mockDay.getUpTime);
  });

  test('empty strings for dates with no saved records', () => {
    const {
      wakeTime,
      getUpTime
    } = TodayView.prototype.getTimesFromLocalStorage(dateWithoutData);

    expect(wakeTime).toEqual('');
    expect(getUpTime).toEqual('');
  });
});

test('TodayView gets the correct spinner color', () => {
  const nightColor = '#F8F8F8';
  const dayColor = '#333333';
  expect(TodayView.prototype.getSpinnerColor(10)).toEqual(dayColor);
  expect(TodayView.prototype.getSpinnerColor(22)).toEqual(nightColor);
});

describe('When not shown, TodayView', () => {
  let editedProps;

  beforeEach(() => {
    editedProps = { ...props, shown: false };
  });

  test('displays a loading spinner', () => {
    const wrapper = mount(<TodayView {...editedProps} />);
    expect(wrapper.find(RotateSpinLoader).length).toEqual(1);
  });

  test('displays a loading spinner with the correct color', () => {
    const expectedColor = TodayView.prototype.getSpinnerColor(editedProps.hour);
    const loader = mount(<TodayView {...editedProps} />)
      .find(RotateSpinLoader)
      .at(0);
    expect(loader.props().color).toEqual(expectedColor);
  });

  test('updates itself to be shown', () => {
    expect(editedProps.showTodayView).toHaveBeenCalledTimes(0);
    shallow(<TodayView {...editedProps} />);
    expect(editedProps.showTodayView).toHaveBeenCalledTimes(1);
  });
});

test('TodayView calculates elapsed time between two times', () => {
  const start = moment('2019 5 13 09:30 AM', 'YYYY M D hh:mm A'),
    end = moment('2019 5 13 09:55 AM', 'YYYY M D hh:mm A');
  // diff of 25 minutes

  const diff = moment(start).from(end, true);
  const todayViewDiff = TodayView.prototype.getTimeDiff(start, end);
  expect(diff).toEqual(todayViewDiff);
});
