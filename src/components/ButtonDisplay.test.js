import React from 'react';
import { mount } from 'enzyme';
import { ButtonDisplay } from './ButtonDisplay';
import Button from './Button';
import dateStore from '../helpers/dateStore';

test('it assigns the correct text and callback', () => {
  const updateSnuzeTimesMock = jest.fn();

  // the text for each time period
  const at2 = {
    // 2am, waking up
    bigBtn: {
      text: '...waking up'
    },
    smallLeftBtn: {
      text: '...getting up'
    },
    smallRightBtn: {
      text: '...going to bed'
    }
  };
  const at10 = {
    // 10am, getting up
    bigBtn: {
      text: '...getting up'
    },
    smallLeftBtn: {
      text: '...waking up'
    },
    smallRightBtn: {
      text: '...going to bed'
    }
  };
  const at18 = {
    // 6pm, going to bed
    bigBtn: {
      text: '...going to bed'
    },
    smallLeftBtn: {
      text: '...waking up'
    },
    smallRightBtn: {
      text: '...getting up'
    }
  };

  // test for 2am to 10am
  let buttonDisplay = mount(
    <ButtonDisplay
      hour={2}
      updateSnuzeTimes={updateSnuzeTimesMock}
      currentTime="test"
      snuzeTimes={{ sleepTime: '', wakeTime: '', getUpTime: '' }}
      date="9999 9 9"
    />
  );

  let buttons = buttonDisplay.find(Button);
  let bigBtn = buttons.at(0);
  let smallLeftBtn = buttons.at(1);
  let smallRightBtn = buttons.at(2);

  expect(bigBtn.props().text).toEqual(at2.bigBtn.text);
  expect(updateSnuzeTimesMock).not.toHaveBeenCalled();
  bigBtn.find('button').simulate('click');
  expect(updateSnuzeTimesMock).toHaveBeenCalledTimes(1);
  updateSnuzeTimesMock.mockClear();

  expect(smallLeftBtn.props().text).toEqual(at2.smallLeftBtn.text);
  expect(updateSnuzeTimesMock).not.toHaveBeenCalled();
  smallLeftBtn.find('button').simulate('click');
  expect(updateSnuzeTimesMock).toHaveBeenCalledTimes(1);
  updateSnuzeTimesMock.mockClear();

  expect(smallRightBtn.props().text).toEqual(at2.smallRightBtn.text);
  expect(updateSnuzeTimesMock).not.toHaveBeenCalled();
  smallRightBtn.find('button').simulate('click');
  expect(updateSnuzeTimesMock).toHaveBeenCalledTimes(1);
  updateSnuzeTimesMock.mockClear();

  // test for 10am to 6pm
  buttonDisplay = mount(
    <ButtonDisplay
      hour={10}
      updateSnuzeTimes={updateSnuzeTimesMock}
      currentTime="test"
      snuzeTimes={{ sleepTime: '', wakeTime: '', getUpTime: '' }}
      date="9999 9 9"
    />
  );

  buttons = buttonDisplay.find(Button);
  bigBtn = buttons.at(0);
  smallLeftBtn = buttons.at(1);
  smallRightBtn = buttons.at(2);

  expect(bigBtn.props().text).toEqual(at10.bigBtn.text);
  expect(updateSnuzeTimesMock).not.toHaveBeenCalled();
  bigBtn.find('button').simulate('click');
  expect(updateSnuzeTimesMock).toHaveBeenCalledTimes(1);
  updateSnuzeTimesMock.mockClear();

  expect(smallLeftBtn.props().text).toEqual(at10.smallLeftBtn.text);
  expect(updateSnuzeTimesMock).not.toHaveBeenCalled();
  smallLeftBtn.find('button').simulate('click');
  expect(updateSnuzeTimesMock).toHaveBeenCalledTimes(1);
  updateSnuzeTimesMock.mockClear();

  expect(smallRightBtn.props().text).toEqual(at10.smallRightBtn.text);
  expect(updateSnuzeTimesMock).not.toHaveBeenCalled();
  smallRightBtn.find('button').simulate('click');
  expect(updateSnuzeTimesMock).toHaveBeenCalledTimes(1);
  updateSnuzeTimesMock.mockClear();

  // test for 6pm to 2am
  buttonDisplay = mount(
    <ButtonDisplay
      hour={18}
      updateSnuzeTimes={updateSnuzeTimesMock}
      currentTime="test"
      snuzeTimes={{ sleepTime: '', wakeTime: '', getUpTime: '' }}
      date="9999 9 9"
    />
  );

  buttons = buttonDisplay.find(Button);
  bigBtn = buttons.at(0);
  smallLeftBtn = buttons.at(1);
  smallRightBtn = buttons.at(2);

  expect(bigBtn.props().text).toEqual(at18.bigBtn.text);
  expect(updateSnuzeTimesMock).not.toHaveBeenCalled();
  bigBtn.find('button').simulate('click');
  expect(updateSnuzeTimesMock).toHaveBeenCalledTimes(1);
  updateSnuzeTimesMock.mockClear();

  expect(smallLeftBtn.props().text).toEqual(at18.smallLeftBtn.text);
  expect(updateSnuzeTimesMock).not.toHaveBeenCalled();
  smallLeftBtn.find('button').simulate('click');
  expect(updateSnuzeTimesMock).toHaveBeenCalledTimes(1);
  updateSnuzeTimesMock.mockClear();

  expect(smallRightBtn.props().text).toEqual(at18.smallRightBtn.text);
  expect(updateSnuzeTimesMock).not.toHaveBeenCalled();
  smallRightBtn.find('button').simulate('click');
  expect(updateSnuzeTimesMock).toHaveBeenCalledTimes(1);
  updateSnuzeTimesMock.mockClear();
});

describe('To localStorage, ButtonDisplay saves', () => {
  const mockDay = {
    sleepTime: '10:30 PM',
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
    const {
      sleepTime,
      wakeTime,
      getUpTime
    } = dateStore.getTimesFromLocalStorage(dateWithData);
    expect(sleepTime).toEqual('');
    expect(wakeTime).toEqual('');
    expect(getUpTime).toEqual('');

    ButtonDisplay.prototype.saveTimesToLocalStorage(dateWithData, mockDay);

    const timesObj = dateStore.getTimesFromLocalStorage(dateWithData);
    expect(timesObj).toEqual(mockDay);
  });
});
