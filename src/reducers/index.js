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

export default combineReducers({
  snuzeTimes: updateSnuzeTimesReducer,
  currentTimes: updateCurrentTimesReducer
});
