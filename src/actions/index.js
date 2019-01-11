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

function showMainApp(bool) {
  return {
    type: constants.SHOW_MAIN_APP,
    payload: bool
  };
}

function showTodayView(bool) {
  return {
    type: constants.SHOW_TODAY_VIEW,
    payload: bool
  };
}

export default {
  updateSnuzeTimes,
  updateCurrentTimes,
  showMainApp,
  showTodayView
};
