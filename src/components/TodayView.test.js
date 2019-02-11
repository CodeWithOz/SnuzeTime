import React from 'react';
import { shallow, mount } from 'enzyme';
import moment from 'moment';
import { RotateSpinLoader } from 'react-css-loaders';
import { TodayView } from './TodayView';
import dateStore from '../helpers/dateStore';

describe('When shown, TodayView displays', () => {
  const defaultTexts = {
    wake: `...haven't woken up.`,
    getUp: `...haven't gotten out of bed.`
  };

  test('default text when empty strings are supplied', () => {
    // componentDidMount depends on the date prop, which is not tested here
    // disabling lifecycle methods prevents errors due to the missing prop
    const wrapper = shallow(
      <TodayView wakeTime="" getUpTime="" shown={true} />,
      { disableLifecycleMethods: true }
    );

    // convert object representation to string for easier matching
    const todayViewAsString = wrapper.render().text();

    expect(todayViewAsString).toContain(defaultTexts.wake);
    expect(todayViewAsString).toContain(defaultTexts.getUp);
  });

  test('supplied text instead of default text', () => {
    const suppliedTexts = {
      wake: `05:45 AM`,
      getUp: `5:50 AM`
    };

    // componentDidMount depends on the date prop, which is not tested here
    // disabling lifecycle methods prevents errors due to the missing prop
    const wrapper = shallow(
      <TodayView
        wakeTime={suppliedTexts.wake}
        getUpTime={suppliedTexts.getUp}
        shown={true}
      />,
      { disableLifecycleMethods: true }
    );

    // convert object representation to string for easier matching
    const todayViewAsString = wrapper.render().text();

    expect(todayViewAsString).toContain(suppliedTexts.wake);
    expect(todayViewAsString).toContain(suppliedTexts.getUp);
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
  test('displays a loading spinner', () => {
    const wrapper = mount(
      <TodayView
        date="9999 9 9"
        updateSnuzeTimes={jest.fn()}
        shown={false}
        hour={10}
        showTodayView={jest.fn()}
      />
    );
    expect(wrapper.find(RotateSpinLoader).length).toEqual(1);
  });

  test('displays a loading spinner with the correct color', () => {
    const hour = 10;
    const expectedColor = TodayView.prototype.getSpinnerColor(hour);
    const loader = mount(
      <TodayView
        date="9999 9 9"
        updateSnuzeTimes={jest.fn()}
        shown={false}
        hour={hour}
        showTodayView={jest.fn()}
      />
    )
      .find(RotateSpinLoader)
      .at(0);
    expect(loader.props().color).toEqual(expectedColor);
  });

  test('updates itself to be shown', () => {
    const showTodayViewMock = jest.fn();
    shallow(
      <TodayView
        date="9999 9 9"
        updateSnuzeTimes={jest.fn()}
        shown={false}
        hour={10}
        showTodayView={showTodayViewMock}
      />
    );
    expect(showTodayViewMock).toHaveBeenCalledTimes(1);
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
