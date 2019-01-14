import React from 'react';
import { shallow, mount } from 'enzyme';
import { RotateSpinLoader } from 'react-css-loaders';
import { TodayView } from './TodayView';
import dateStore from '../helpers/dateStore';

describe('When shown, TodayView displays', () => {
  const defaultTexts = {
    sleep: `...haven't gone to bed.`,
    wake: `...haven't woken up.`,
    getUp: `...haven't gotten out of bed.`
  };

  test('default text when empty strings are supplied', () => {
    // componentDidMount depends on the date prop, which is not tested here
    // disabling lifecycle methods prevents errors due to the missing prop
    const wrapper = shallow(
      <TodayView sleepTime="" wakeTime="" getUpTime="" shown={true} />,
      { disableLifecycleMethods: true }
    );

    // convert object representation to string for easier matching
    const todayViewAsString = wrapper.render().text();

    expect(todayViewAsString).toContain(defaultTexts.sleep);
    expect(todayViewAsString).toContain(defaultTexts.wake);
    expect(todayViewAsString).toContain(defaultTexts.getUp);
  });

  test('supplied text instead of default text', () => {
    const suppliedTexts = {
      sleep: `11:45 PM`,
      wake: `05:45 AM`,
      getUp: `5:50 AM`
    };

    // componentDidMount depends on the date prop, which is not tested here
    // disabling lifecycle methods prevents errors due to the missing prop
    const wrapper = shallow(
      <TodayView
        sleepTime={suppliedTexts.sleep}
        wakeTime={suppliedTexts.wake}
        getUpTime={suppliedTexts.getUp}
        shown={true}
      />,
      { disableLifecycleMethods: true }
    );

    // convert object representation to string for easier matching
    const todayViewAsString = wrapper.render().text();

    expect(todayViewAsString).toContain(suppliedTexts.sleep);
    expect(todayViewAsString).toContain(suppliedTexts.wake);
    expect(todayViewAsString).toContain(suppliedTexts.getUp);
    expect(todayViewAsString).not.toContain(defaultTexts.sleep);
    expect(todayViewAsString).not.toContain(defaultTexts.wake);
    expect(todayViewAsString).not.toContain(defaultTexts.getUp);
  });
});

describe('From localStorage, TodayView gets', () => {
  const mockDay = {
    sleepTime: '10:30 PM',
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
      sleepTime,
      wakeTime,
      getUpTime
    } = TodayView.prototype.getTimesFromLocalStorage(dateWithData);

    expect(sleepTime).toEqual(mockDay.sleepTime);
    expect(wakeTime).toEqual(mockDay.wakeTime);
    expect(getUpTime).toEqual(mockDay.getUpTime);
  });

  test('empty strings for dates with no saved records', () => {
    const {
      sleepTime,
      wakeTime,
      getUpTime
    } = TodayView.prototype.getTimesFromLocalStorage(dateWithoutData);

    expect(sleepTime).toEqual('');
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

describe('When not shown, TodayView displays', () => {
  test('a loading spinner', () => {
    const wrapper = mount(
      <TodayView
        date="9999 9 9"
        updateSnuzeTimes={jest.fn()}
        shown={false}
        hour={10}
      />
    );
    expect(wrapper.find(RotateSpinLoader).length).toEqual(1);
  });

  test('a loading spinner with the correct color', () => {
    const hour = 10;
    const expectedColor = TodayView.prototype.getSpinnerColor(hour);
    const loader = mount(
      <TodayView
        date="9999 9 9"
        updateSnuzeTimes={jest.fn()}
        shown={false}
        hour={hour}
      />
    )
      .find(RotateSpinLoader)
      .at(0);
    expect(loader.props().color).toEqual(expectedColor);
  });
});
