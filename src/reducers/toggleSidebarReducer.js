import { INITIAL_STATE, TOGGLE_SIDEBAR } from '../constants';

const toggleSidebarReducer = (
  sidebarShown = INITIAL_STATE.sidebarShown,
  { type, payload }
) => {
  return type === TOGGLE_SIDEBAR ? payload : sidebarShown;
};

export default toggleSidebarReducer;
