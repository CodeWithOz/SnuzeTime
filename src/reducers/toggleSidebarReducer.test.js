import toggleSidebarReducer from './toggleSidebarReducer';
import { INITIAL_STATE } from '../constants';

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
  });
});
