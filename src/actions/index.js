import {
  UPDATE_SNUZE_TIMES,
  UPDATE_CURRENT_TIMES,
  SHOW_MAIN_APP,
  SHOW_TODAY_VIEW,
  TOGGLE_SIDEBAR
} from '../constants';

export function updateSnuzeTimes(wakeTime, getUpTime) {
  return {
    type: UPDATE_SNUZE_TIMES,
    payload: {
      wakeTime: wakeTime || '',
      getUpTime: getUpTime || ''
    }
  };
}

export function updateCurrentTimes(timesObj) {
  return {
    type: UPDATE_CURRENT_TIMES,
    payload: timesObj
  };
}

export function showMainApp(bool) {
  return {
    type: SHOW_MAIN_APP,
    payload: bool
  };
}

export function showTodayView(bool) {
  return {
    type: SHOW_TODAY_VIEW,
    payload: bool
  };
}

export function toggleSidebar(bool) {
  return {
    type: TOGGLE_SIDEBAR,
    payload: bool
  };
}

export default {
  updateSnuzeTimes,
  updateCurrentTimes,
  showMainApp,
  showTodayView,
  toggleSidebar
};
