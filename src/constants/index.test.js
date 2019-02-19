import {
  UPDATE_SNUZE_TIMES,
  UPDATE_CURRENT_TIMES,
  SHOW_MAIN_APP,
  SHOW_TODAY_VIEW,
  INITIAL_STATE,
  TOGGLE_SIDEBAR
} from './';

const {
  snuzeTimes,
  currentTimes,
  mainAppShown,
  todayViewShown,
  sidebarShown
} = INITIAL_STATE;

test('UPDATE_SNUZE_TIMES has the correct value', () => {
  expect(UPDATE_SNUZE_TIMES).toEqual('UPDATE_SNUZE_TIMES');
});

test('UPDATE_CURRENT_TIMES has the correct value', () => {
  expect(UPDATE_CURRENT_TIMES).toEqual('UPDATE_CURRENT_TIMES');
});

test('SHOW_MAIN_APP has the correct value', () => {
  expect(SHOW_MAIN_APP).toEqual('SHOW_MAIN_APP');
});

test('SHOW_TODAY_VIEW has the correct value', () => {
  expect(SHOW_TODAY_VIEW).toEqual('SHOW_TODAY_VIEW');
});

test('INITIAL_STATE has the correct snuzeTimes values', () => {
  const expectedTimes = {
    wakeTime: '',
    getUpTime: ''
  };
  expect(snuzeTimes).toEqual(expectedTimes);
});

test('INITIAL_STATE has the correct currentTimes values', () => {
  const expectedCurrentTimes = {
    withSeconds: '99:99:99 PM',
    withoutSeconds: '',
    hour: -1,
    date: '0000 00 00'
  };
  expect(currentTimes).toEqual(expectedCurrentTimes);
});

test('INITIAL_STATE has the correct mainAppShown value', () => {
  // main app is not shown by default
  expect(mainAppShown).toEqual(false);
});

test('INITIAL_STATE has the correct todayViewShown value', () => {
  // main app is not shown by default
  expect(todayViewShown).toEqual(false);
});

test('INITIAL_STATE has the correct sidebarShown value', () => {
  // main app is not shown by default
  expect(sidebarShown).toEqual(false);
});

test('TOGGLE_SIDEBAR has the correct value', () => {
  expect(TOGGLE_SIDEBAR).toEqual('TOGGLE_SIDEBAR');
});
