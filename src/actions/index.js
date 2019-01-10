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

export default {
  updateSnuzeTimes
};