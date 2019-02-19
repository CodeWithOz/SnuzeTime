import updateCurrentTimesReducer from './updateCurrentTimesReducer';
import constants from '../constants';

describe('updateCurrentTimesReducer', () => {
  test('is a function', () => {
    expect(typeof updateCurrentTimesReducer).toEqual('function');
  });

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
