import toggleSidebarReducer from './toggleSidebarReducer';
import { INITIAL_STATE, TOGGLE_SIDEBAR } from '../constants';

describe('toggleSidebarReducer', () => {
  test('is a function', () => {
    expect(typeof toggleSidebarReducer).toEqual('function');
  });

  describe('returns', () => {
    test('the initial state by default', () => {
      // no type key in action so it doesn't match reducer
      const state = toggleSidebarReducer(undefined, {});
      expect(state).toEqual(INITIAL_STATE.sidebarShown);
    });

    test(`previous state when action doesn't match`, () => {
      let previousState = true;
      let state = toggleSidebarReducer(previousState, {});
      expect(state).toEqual(previousState);

      previousState = false;
      state = toggleSidebarReducer(previousState, {});
      expect(state).toEqual(previousState);
    });

    test('supplied payload if action matches', () => {
      let payload = true;
      let state = toggleSidebarReducer(undefined, {
        type: TOGGLE_SIDEBAR,
        payload
      });
      expect(state).toEqual(payload);

      payload = false;
      state = toggleSidebarReducer(undefined, {
        type: TOGGLE_SIDEBAR,
        payload
      });
      expect(state).toEqual(payload);
    });
  });
});
