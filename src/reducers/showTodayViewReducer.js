import constants from '../constants';

const showTodayViewReducer = (
  todayViewShown = constants.INITIAL_STATE.todayViewShown,
  action
) => {
  return action.type === constants.SHOW_TODAY_VIEW
    ? action.payload
    : todayViewShown;
};

export default showTodayViewReducer;
