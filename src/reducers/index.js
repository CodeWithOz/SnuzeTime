import { combineReducers } from 'redux';
import updateSnuzeTimesReducer from './updateSnuzeTimesReducer';
import updateCurrentTimesReducer from './updateCurrentTimesReducer';
import showMainAppReducer from './showMainAppReducer';
import showTodayViewReducer from './showTodayViewReducer';
import toggleSidebarReducer from './toggleSidebarReducer';

export default combineReducers({
  snuzeTimes: updateSnuzeTimesReducer,
  currentTimes: updateCurrentTimesReducer,
  mainAppShown: showMainAppReducer,
  todayViewShown: showTodayViewReducer,
  sidebarShown: toggleSidebarReducer
});
