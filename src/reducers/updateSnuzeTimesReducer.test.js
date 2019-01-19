import updateSnuzeTimesReducer from './updateSnuzeTimesReducer';
import constants from '../constants';

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
