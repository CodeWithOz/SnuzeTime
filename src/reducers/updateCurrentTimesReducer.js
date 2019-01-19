import constants from '../constants';

const updateCurrentTimesReducer = (
  currentTimes = constants.INITIAL_STATE.currentTimes,
  action
) => {
  return action.type === constants.UPDATE_CURRENT_TIMES
    ? action.payload
    : currentTimes;
};

export default updateCurrentTimesReducer;
