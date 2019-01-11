import actionCreators from './';
import constants from '../constants';

describe('updateSnuzeTimes action creator returns', () => {
  test('the correct action format and type', () => {
    const action = actionCreators.updateSnuzeTimes();
    expect(action.type).toBeDefined();
    expect(action.payload).toBeDefined();
    expect(action.type).toEqual(constants.UPDATE_SNUZE_TIMES);
  });

  describe('the correct payload when', () => {
    test('no values are supplied', () => {
      const expectedPayload = {
        sleepTime: '',
        wakeTime: '',
        getUpTime: ''
      };
      const { payload } = actionCreators.updateSnuzeTimes();
      expect(payload).toEqual(expectedPayload);
    });

    test('some or all values are supplied', () => {
      // some values
      const firstArg = 'first';
      let args = [firstArg, null, null];
      let expectedPayload = {
        sleepTime: firstArg,
        wakeTime: '',
        getUpTime: ''
      };
      let { payload } = actionCreators.updateSnuzeTimes(...args);
      expect(payload).toEqual(expectedPayload);

      const secondArg = 'second';
      args = [null, secondArg, null];
      expectedPayload = {
        sleepTime: '',
        wakeTime: secondArg,
        getUpTime: ''
      };
      ({ payload } = actionCreators.updateSnuzeTimes(...args));
      expect(payload).toEqual(expectedPayload);

      const thirdArg = 'third';
      args = [null, null, thirdArg];
      expectedPayload = {
        sleepTime: '',
        wakeTime: '',
        getUpTime: thirdArg
      };
      ({ payload } = actionCreators.updateSnuzeTimes(...args));
      expect(payload).toEqual(expectedPayload);

      // all values
      args = [firstArg, secondArg, thirdArg];
      expectedPayload = {
        sleepTime: firstArg,
        wakeTime: secondArg,
        getUpTime: thirdArg
      };
      ({ payload } = actionCreators.updateSnuzeTimes(...args));
      expect(payload).toEqual(expectedPayload);
    });
  });
});

describe('updateCurrentTimes action creator returns', () => {
  const timesObj = {
    withSeconds: 'test',
    withoutSeconds: 'test2',
    hour: -1,
    date: 'test3'
  };

  test('the correct action format and type', () => {
    const action = actionCreators.updateCurrentTimes(timesObj);
    expect(action.type).toBeDefined();
    expect(action.payload).toBeDefined();
    expect(action.type).toEqual(constants.UPDATE_CURRENT_TIMES);
  });

  test('the correct payload', () => {
    const { payload } = actionCreators.updateCurrentTimes(timesObj);
    expect(payload).toEqual(timesObj);
  });
});

describe('showMainApp action creator returns', () => {
  test('the correct action format and type', () => {
    const action = actionCreators.showMainApp(true);
    expect(action.type).toBeDefined();
    expect(action.payload).toBeDefined();
    expect(action.type).toEqual(constants.SHOW_MAIN_APP);
  });

  test('the correct payload', () => {
    let { payload } = actionCreators.showMainApp(true);
    expect(payload).toEqual(true);

    ({ payload } = actionCreators.showMainApp(false));
    expect(payload).toEqual(false);
  });
});

describe('showTodayView action creator returns', () => {
  test('the correct action format and type', () => {
    const action = actionCreators.showTodayView(true);
    expect(action.type).toBeDefined();
    expect(action.payload).toBeDefined();
    expect(action.type).toEqual(constants.SHOW_TODAY_VIEW);
  });

  test('the correct payload', () => {
    let { payload } = actionCreators.showTodayView(true);
    expect(payload).toEqual(true);

    ({ payload } = actionCreators.showTodayView(false));
    expect(payload).toEqual(false);
  });
});
