import constants from '../constants';

const updateSnuzeTimesReducer = (
  snuzeTimes = constants.INITIAL_STATE.snuzeTimes,
  action
) => {
  return action.type === constants.UPDATE_SNUZE_TIMES
    ? action.payload
    : snuzeTimes;
};

export default updateSnuzeTimesReducer;
