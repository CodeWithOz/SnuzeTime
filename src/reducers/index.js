import { combineReducers } from 'redux';
import constants from '../constants';

export const updateSnuzeTimesReducer = (
  snuzeTimes = constants.INITIAL_STATE.snuzeTimes,
  action
) => {
  return action.type === constants.UPDATE_SNUZE_TIMES
    ? action.payload
    : snuzeTimes;
};

export const updateCurrentTimesReducer = (
  currentTimes = constants.INITIAL_STATE.currentTimes,
  action
) => {
  return action.type === constants.UPDATE_CURRENT_TIMES
    ? action.payload
    : currentTimes;
};

export const showMainAppReducer = (
  mainAppShown = constants.INITIAL_STATE.mainAppShown,
  action
) => {
  return action.type === constants.SHOW_MAIN_APP
    ? action.payload
    : mainAppShown;
};

export const showTodayViewReducer = (
  todayViewShown = constants.INITIAL_STATE.todayViewShown,
  action
) => {
  return action.type === constants.SHOW_TODAY_VIEW
    ? action.payload
    : todayViewShown;
};

export default combineReducers({
  snuzeTimes: updateSnuzeTimesReducer,
  currentTimes: updateCurrentTimesReducer,
  mainAppShown: showMainAppReducer,
  todayViewShown: showTodayViewReducer
});