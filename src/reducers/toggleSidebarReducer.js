import { INITIAL_STATE } from '../constants';

const toggleSidebarReducer = (sidebarShown = INITIAL_STATE.sidebarShown) => {
  return sidebarShown;
};

export default toggleSidebarReducer;
