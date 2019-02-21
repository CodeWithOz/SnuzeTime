import React from 'react';
import { shallow, mount } from 'enzyme';
import { ButtonDisplay } from './ButtonDisplay';
import Button from './Button';
import dateStore from '../helpers/dateStore';

describe('ButtonDisplay', () => {
  test('assigns the correct text and callback', () => {
    const updateSnuzeTimesMock = jest.fn();

    // the text for each time period
    const btnDisplayConfig = {
      leftBtn: {
        text: '...waking up'
      },
      rightBtn: {
        text: '...getting up'
      }
    };

    const buttonDisplay = mount(
      <ButtonDisplay
        updateSnuzeTimes={updateSnuzeTimesMock}
        currentTime="test"
        snuzeTimes={{ wakeTime: '', getUpTime: '' }}
        date="9999 9 9"
      />
    );

    const buttons = buttonDisplay.find(Button);
    const leftBtn = buttons.at(0);
    const rightBtn = buttons.at(1);

    expect(leftBtn.props().text).toEqual(btnDisplayConfig.leftBtn.text);
    expect(updateSnuzeTimesMock).not.toHaveBeenCalled();
    leftBtn.find('button').simulate('click');
    expect(updateSnuzeTimesMock).toHaveBeenCalledTimes(1);
    updateSnuzeTimesMock.mockClear();

    expect(rightBtn.props().text).toEqual(btnDisplayConfig.rightBtn.text);
    expect(updateSnuzeTimesMock).not.toHaveBeenCalled();
    rightBtn.find('button').simulate('click');
    expect(updateSnuzeTimesMock).toHaveBeenCalledTimes(1);
    updateSnuzeTimesMock.mockClear();
  });

  describe('exposes getClickHandler which', () => {
    const date = '9999 9 9';
    const snuzeTimes = { wakeTime: '', getUpTime: '' };
    const mockCallback = jest.fn();
    let wrapper;

    beforeEach(() => {
      // the method is saved in a property as an arrow function to bind 'this'
      // it is therefore not on the prototype and must be reached by
      // shallow rendering the component
      wrapper = shallow(
        <ButtonDisplay
          date={date}
          snuzeTimes={snuzeTimes}
          updateSnuzeTimes={mockCallback}
        />
      );
    });

    test('is a function', () => {
      expect(typeof wrapper.instance().getClickHandler).toEqual('function');
    });

    test('returns a function', () => {
      expect(
        typeof wrapper.instance().getClickHandler('test argument')
      ).toEqual('function');
    });
  });
});

describe('To localStorage, ButtonDisplay saves', () => {
  const mockDay = {
    wakeTime: '06:00 AM',
    getUpTime: '06:30 AM'
  };
  const dateWithData = '2018 10 6';

  afterEach(() => {
    if (localStorage.getItem('dates') !== null)
      localStorage.removeItem('dates');
  });

  test('supplied times for a supplied date', () => {
    // ensure that there are no initial values for the date
    let { wakeTime, getUpTime } = dateStore.getTimesFromLocalStorage(
      dateWithData
    );
    expect(wakeTime).toEqual('');
    expect(getUpTime).toEqual('');

    ButtonDisplay.prototype.saveTimesToLocalStorage(dateWithData, mockDay);

    ({ wakeTime, getUpTime } = dateStore.getTimesFromLocalStorage(
      dateWithData
    ));
    expect(wakeTime).toEqual(mockDay.wakeTime);
    expect(getUpTime).toEqual(mockDay.getUpTime);
  });
});
