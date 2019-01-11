import constants from './';

test('UPDATE_SNUZE_TIMES has the correct value', () => {
  expect(constants.UPDATE_SNUZE_TIMES).toEqual('UPDATE_SNUZE_TIMES');
});

test('UPDATE_CURRENT_TIMES has the correct value', () => {
  expect(constants.UPDATE_CURRENT_TIMES).toEqual('UPDATE_CURRENT_TIMES');
});

test('SHOW_MAIN_APP has the correct value', () => {
  expect(constants.SHOW_MAIN_APP).toEqual('SHOW_MAIN_APP');
});

test('SHOW_TODAY_VIEW has the correct value', () => {
  expect(constants.SHOW_TODAY_VIEW).toEqual('SHOW_TODAY_VIEW');
});

test('INITIAL_STATE has the correct snuzeTimes values', () => {
  const expectedTimes = {
    sleepTime: '',
    wakeTime: '',
    getUpTime: ''
  };
  expect(constants.INITIAL_STATE.snuzeTimes).toEqual(expectedTimes);
});

test('INITIAL_STATE has the correct currentTimes values', () => {
  const expectedCurrentTimes = {
    withSeconds: '',
    withoutSeconds: '',
    hour: -1,
    date: ''
  };
  expect(constants.INITIAL_STATE.currentTimes).toEqual(expectedCurrentTimes);
});

test('INITIAL_STATE has the correct mainAppShown value', () => {
  // main app is not shown by default
  expect(constants.INITIAL_STATE.mainAppShown).toEqual(false);
});

test('INITIAL_STATE has the correct todayViewShown value', () => {
  // main app is not shown by default
  expect(constants.INITIAL_STATE.todayViewShown).toEqual(false);
});