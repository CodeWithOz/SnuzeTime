import constants from '../constants';

export function updateSnuzeTimes(wakeTime, getUpTime) {
  return {
    type: constants.UPDATE_SNUZE_TIMES,
    payload: {
      wakeTime: wakeTime || '',
      getUpTime: getUpTime || ''
    }
  };
}

export function updateCurrentTimes(timesObj) {
  return {
    type: constants.UPDATE_CURRENT_TIMES,
    payload: timesObj
  };
}

export function showMainApp(bool) {
  return {
    type: constants.SHOW_MAIN_APP,
    payload: bool
  };
}

export function showTodayView(bool) {
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
