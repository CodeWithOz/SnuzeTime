import constants from '../constants';

const showMainAppReducer = (
  mainAppShown = constants.INITIAL_STATE.mainAppShown,
  action
) => {
  return action.type === constants.SHOW_MAIN_APP
    ? action.payload
    : mainAppShown;
};

export default showMainAppReducer;
