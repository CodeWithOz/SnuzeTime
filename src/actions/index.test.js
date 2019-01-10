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
