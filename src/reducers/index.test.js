import constants from '../constants';
import {
  updateSnuzeTimesReducer,
  updateCurrentTimesReducer,
  showMainAppReducer
} from './';

describe('updateSnuzeTimesReducer', () => {
  test('returns initial state by default', () => {
    // when action does not match reducer (no type is supplied)
    const state = updateSnuzeTimesReducer(undefined, {});
    expect(state).toEqual(constants.INITIAL_STATE.snuzeTimes);
  });

  test('returns the supplied payload when the action matches', () => {
    const snuzeTimes = { sleepTime: 'test', wakeTime: 'test2', getUpTime: '' };

    const state = updateSnuzeTimesReducer(undefined, {
      type: constants.UPDATE_SNUZE_TIMES,
      payload: snuzeTimes
    });
    expect(state).toEqual(snuzeTimes);
  });

  test(`returns the previous state when the action doesn't match`, () => {
    const snuzeTimes = { sleepTime: 'test', wakeTime: 'test2', getUpTime: '' };

    const state = updateSnuzeTimesReducer(snuzeTimes, {
      type: 'test'
    });
    expect(state).toEqual(snuzeTimes);
  });
});

describe('updateCurrentTimesReducer', () => {
  test('returns initial state by default', () => {
    // action does not match reducer (no type is supplied)
    const state = updateCurrentTimesReducer(undefined, {});
    expect(state).toEqual(constants.INITIAL_STATE.currentTimes);
  });

  test('returns the supplied payload when the action matches', () => {
    const currentTimes = {
      withSeconds: 'test',
      withoutSeconds: 'test2',
      hour: -1,
      date: 'test3'
    };

    const state = updateCurrentTimesReducer(undefined, {
      type: constants.UPDATE_CURRENT_TIMES,
      payload: currentTimes
    });
    expect(state).toEqual(currentTimes);
  });

  test(`returns the previous state when the action doesn't match`, () => {
    const previousState = {
      withSeconds: 'test',
      withoutSeconds: 'test2',
      hour: -1,
      date: 'test3'
    };

    const state = updateCurrentTimesReducer(previousState, {
      type: 'test'
    });
    expect(state).toEqual(previousState);
  });
});

describe('showMainAppReducer', () => {
  test('returns initial state by default', () => {
    // action does not match reducer (no type is supplied)
    const state = showMainAppReducer(undefined, {});
    expect(state).toEqual(constants.INITIAL_STATE.mainAppShown);
  });

  test('returns the supplied payload when the action matches', () => {
    let state = showMainAppReducer(undefined, {
      type: constants.SHOW_MAIN_APP,
      payload: true
    });
    expect(state).toEqual(true);

    state = showMainAppReducer(undefined, {
      type: constants.SHOW_MAIN_APP,
      payload: false
    });
    expect(state).toEqual(false);
  });

  test(`returns the previous state when the action doesn't match`, () => {
    const previousState = true;

    const state = showMainAppReducer(previousState, {
      type: 'test'
    });
    expect(state).toEqual(previousState);
  });
});
