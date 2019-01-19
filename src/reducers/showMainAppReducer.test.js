import showMainAppReducer from './showMainAppReducer';
import constants from '../constants';

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
