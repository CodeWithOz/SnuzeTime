import constants from '../constants';

function updateSnuzeTimes(sleepTime, wakeTime, getUpTime) {
  return {
    type: constants.UPDATE_SNUZE_TIMES,
    payload: {
      sleepTime: sleepTime || '',
      wakeTime: wakeTime || '',
      getUpTime: getUpTime || ''
    }
  };
}

function updateCurrentTimes(timesObj) {
  return {
    type: constants.UPDATE_CURRENT_TIMES,
    payload: timesObj
  };
}

export default {
  updateSnuzeTimes,
  updateCurrentTimes
};
