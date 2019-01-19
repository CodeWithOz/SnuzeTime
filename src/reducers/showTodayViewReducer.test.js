import showTodayViewReducer from './showTodayViewReducer';
import constants from '../constants';

describe('showTodayViewReducer', () => {
  test('returns initial state by default', () => {
    // action does not match reducer (no type is supplied)
    const state = showTodayViewReducer(undefined, {});
    expect(state).toEqual(constants.INITIAL_STATE.todayViewShown);
  });

  test('returns the supplied payload when the action matches', () => {
    let state = showTodayViewReducer(undefined, {
      type: constants.SHOW_TODAY_VIEW,
      payload: true
    });
    expect(state).toEqual(true);

    state = showTodayViewReducer(undefined, {
      type: constants.SHOW_TODAY_VIEW,
      payload: false
    });
    expect(state).toEqual(false);
  });

  test(`returns the previous state when the action doesn't match`, () => {
    const previousState = true;

    const state = showTodayViewReducer(previousState, {
      type: 'test'
    });
    expect(state).toEqual(previousState);
  });
});
