import {
  updateSnuzeTimes,
  updateCurrentTimes,
  showMainApp,
  showTodayView,
  toggleSidebar
} from './';

import {
  UPDATE_SNUZE_TIMES,
  UPDATE_CURRENT_TIMES,
  SHOW_MAIN_APP,
  SHOW_TODAY_VIEW,
  TOGGLE_SIDEBAR
} from '../constants';

describe('updateSnuzeTimes', () => {
  test('is a function', () => {
    expect(typeof updateSnuzeTimes).toEqual('function');
  });

  describe('returns', () => {
    test('the correct action format and type', () => {
      const action = updateSnuzeTimes();
      expect(action.type).toBeDefined();
      expect(action.payload).toBeDefined();
      expect(action.type).toEqual(UPDATE_SNUZE_TIMES);
    });

    describe('the correct payload when', () => {
      test('no values are supplied', () => {
        const expectedPayload = {
          wakeTime: '',
          getUpTime: ''
        };
        const { payload } = updateSnuzeTimes();
        expect(payload).toEqual(expectedPayload);
      });

      test('some or all values are supplied', () => {
        // some values
        const firstArg = 'first';
        let args = [firstArg, null];
        let expectedPayload = {
          wakeTime: firstArg,
          getUpTime: ''
        };
        let { payload } = updateSnuzeTimes(...args);
        expect(payload).toEqual(expectedPayload);

        const secondArg = 'second';
        args = [null, secondArg];
        expectedPayload = {
          wakeTime: '',
          getUpTime: secondArg
        };
        ({ payload } = updateSnuzeTimes(...args));
        expect(payload).toEqual(expectedPayload);

        // all values
        args = [firstArg, secondArg];
        expectedPayload = {
          wakeTime: firstArg,
          getUpTime: secondArg
        };
        ({ payload } = updateSnuzeTimes(...args));
        expect(payload).toEqual(expectedPayload);
      });
    });
  });
});

describe('updateCurrentTimes', () => {
  const timesObj = {
    withSeconds: 'test',
    withoutSeconds: 'test2',
    hour: -1,
    date: 'test3'
  };

  test('is a function', () => {
    expect(typeof updateCurrentTimes).toEqual('function');
  });

  describe('returns', () => {
    test('the correct action format and type', () => {
      const action = updateCurrentTimes(timesObj);
      expect(action.type).toBeDefined();
      expect(action.payload).toBeDefined();
      expect(action.type).toEqual(UPDATE_CURRENT_TIMES);
    });

    test('the correct payload', () => {
      const { payload } = updateCurrentTimes(timesObj);
      expect(payload).toEqual(timesObj);
    });
  });
});

describe('showMainApp', () => {
  test('is a function', () => {
    expect(typeof showMainApp).toEqual('function');
  });

  describe('returns', () => {
    test('the correct action format and type', () => {
      const action = showMainApp(true);
      expect(action.type).toBeDefined();
      expect(action.payload).toBeDefined();
      expect(action.type).toEqual(SHOW_MAIN_APP);
    });

    test('the correct payload', () => {
      let { payload } = showMainApp(true);
      expect(payload).toEqual(true);

      ({ payload } = showMainApp(false));
      expect(payload).toEqual(false);
    });
  });
});

describe('showTodayView', () => {
  test('is a function', () => {
    expect(typeof showTodayView).toEqual('function');
  });

  describe('returns', () => {
    test('the correct action format and type', () => {
      const action = showTodayView(true);
      expect(action.type).toBeDefined();
      expect(action.payload).toBeDefined();
      expect(action.type).toEqual(SHOW_TODAY_VIEW);
    });

    test('the correct payload', () => {
      let { payload } = showTodayView(true);
      expect(payload).toEqual(true);

      ({ payload } = showTodayView(false));
      expect(payload).toEqual(false);
    });
  });
});

describe('toggleSidebar', () => {
  test('is a function', () => {
    expect(typeof toggleSidebar).toEqual('function');
  });

  describe('returns', () => {
    test('a function', () => {
      expect(typeof toggleSidebar()).toEqual('function');
    });

    describe('a function that', () => {
      let dispatch, getState;
      const sidebarShown = true;

      beforeEach(() => {
        dispatch = jest.fn();
        getState = jest.fn(() => {
          return { sidebarShown };
        });
      });

      test('calls its first argument (dispatch) with the correct action format', () => {
        const thunk = jest.fn(toggleSidebar());
        expect(thunk).not.toHaveBeenCalled();
        expect(dispatch).not.toHaveBeenCalled();

        thunk(dispatch, getState);
        expect(dispatch).toHaveBeenCalledTimes(1);
        const dispatchedAction = dispatch.mock.calls[0][0];
        expect(dispatchedAction.type).toBeDefined();
        expect(dispatchedAction.payload).toBeDefined();
      });

      test('dispatches an action with the correct type', () => {
        const thunk = toggleSidebar();
        thunk(dispatch, getState);
        const dispatchedAction = dispatch.mock.calls[0][0];
        expect(dispatchedAction.type).toEqual(TOGGLE_SIDEBAR);
      });

      test('dispatches an action with payload reversed from previous state', () => {
        const thunk = toggleSidebar();
        expect(getState).not.toHaveBeenCalled();
        thunk(dispatch, getState);
        expect(getState).toHaveBeenCalled();
        const dispatchedAction = dispatch.mock.calls[0][0];
        expect(dispatchedAction.payload).toEqual(!sidebarShown);
      });
    });
  });
});
