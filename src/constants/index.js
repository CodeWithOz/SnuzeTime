export const UPDATE_SNUZE_TIMES = 'UPDATE_SNUZE_TIMES';
export const UPDATE_CURRENT_TIMES = 'UPDATE_CURRENT_TIMES';
export const SHOW_MAIN_APP = 'SHOW_MAIN_APP';
export const SHOW_TODAY_VIEW = 'SHOW_TODAY_VIEW';

export const INITIAL_STATE = {
  snuzeTimes: {
    wakeTime: '',
    getUpTime: ''
  },
  currentTimes: {
    withSeconds: '99:99:99 PM',
    withoutSeconds: '',
    hour: -1,
    date: '0000 00 00'
  },
  mainAppShown: false,
  todayViewShown: false
};

export default {
  UPDATE_SNUZE_TIMES,
  UPDATE_CURRENT_TIMES,
  SHOW_MAIN_APP,
  SHOW_TODAY_VIEW,
  INITIAL_STATE
};
