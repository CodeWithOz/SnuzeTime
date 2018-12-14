import React from 'react';
import ButtonDisplay from './ButtonDisplay';
import Button from './Button';
import TestRenderer from 'react-test-renderer';

test('it assigns the correct text and callback', () => {
  // callbacks return simple text
  // the goal is to check that it is the same callback, not the output of the callback
  const callbacks = {
    sleep: () => 'sleep',
    getUp: () => 'getUp',
    wake: () => 'wake'
  };

  // the text and callbacks for each time period
  const at2 = {
    // waking up
    bigBtn: {
      text: '...waking up',
      callback: callbacks.wake
    },
    smallLeftBtn: {
      text: '...getting up',
      callback: callbacks.getUp
    },
    smallRightBtn: {
      text: '...going to bed',
      callback: callbacks.sleep
    }
  };
  const at10 = {
    // getting up
    bigBtn: {
      text: '...getting up',
      callback: callbacks.getUp
    },
    smallLeftBtn: {
      text: '...waking up',
      callback: callbacks.wake
    },
    smallRightBtn: {
      text: '...going to bed',
      callback: callbacks.sleep
    }
  };
  const at18 = {
    // going to bed
    bigBtn: {
      text: '...going to bed',
      callback: callbacks.sleep
    },
    smallLeftBtn: {
      text: '...waking up',
      callback: callbacks.wake
    },
    smallRightBtn: {
      text: '...getting up',
      callback: callbacks.getUp
    }
  };

  // test for 2am to 10am
  let buttonDisplay = TestRenderer.create(
    <ButtonDisplay
      hour={2}
      saveSleepTime={callbacks.sleep}
      saveWakeTime={callbacks.wake}
      saveGetUpTime={callbacks.getUp}
    />
  );

  let btnDisplayInstance = buttonDisplay.root;
  let [bigBtn, smallLeftBtn, smallRightBtn] = btnDisplayInstance.findAllByType(
    Button
  );

  expect(bigBtn.props.text).toEqual(at2.bigBtn.text);
  expect(bigBtn.props.onClick).toBe(at2.bigBtn.callback);
  expect(smallLeftBtn.props.text).toEqual(at2.smallLeftBtn.text);
  expect(smallLeftBtn.props.onClick).toBe(at2.smallLeftBtn.callback);
  expect(smallRightBtn.props.text).toEqual(at2.smallRightBtn.text);
  expect(smallRightBtn.props.onClick).toBe(at2.smallRightBtn.callback);

  // test for 10am to 6pm
  buttonDisplay.update(
    <ButtonDisplay
      hour={10}
      saveSleepTime={callbacks.sleep}
      saveWakeTime={callbacks.wake}
      saveGetUpTime={callbacks.getUp}
    />
  );

  btnDisplayInstance = buttonDisplay.root;
  [bigBtn, smallLeftBtn, smallRightBtn] = btnDisplayInstance.findAllByType(
    Button
  );

  expect(bigBtn.props.text).toEqual(at10.bigBtn.text);
  expect(bigBtn.props.onClick).toBe(at10.bigBtn.callback);
  expect(smallLeftBtn.props.text).toEqual(at10.smallLeftBtn.text);
  expect(smallLeftBtn.props.onClick).toBe(at10.smallLeftBtn.callback);
  expect(smallRightBtn.props.text).toEqual(at10.smallRightBtn.text);
  expect(smallRightBtn.props.onClick).toBe(at10.smallRightBtn.callback);

  // test for 6pm to 2am
  buttonDisplay.update(
    <ButtonDisplay
      hour={18}
      saveSleepTime={callbacks.sleep}
      saveWakeTime={callbacks.wake}
      saveGetUpTime={callbacks.getUp}
    />
  );

  btnDisplayInstance = buttonDisplay.root;
  [bigBtn, smallLeftBtn, smallRightBtn] = btnDisplayInstance.findAllByType(
    Button
  );

  expect(bigBtn.props.text).toEqual(at18.bigBtn.text);
  expect(bigBtn.props.onClick).toBe(at18.bigBtn.callback);
  expect(smallLeftBtn.props.text).toEqual(at18.smallLeftBtn.text);
  expect(smallLeftBtn.props.onClick).toBe(at18.smallLeftBtn.callback);
  expect(smallRightBtn.props.text).toEqual(at18.smallRightBtn.text);
  expect(smallRightBtn.props.onClick).toBe(at18.smallRightBtn.callback);
});
