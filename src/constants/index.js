const UPDATE_SNUZE_TIMES = 'UPDATE_SNUZE_TIMES';
const UPDATE_CURRENT_TIMES = 'UPDATE_CURRENT_TIMES';
const SHOW_MAIN_APP = 'SHOW_MAIN_APP';
const SHOW_TODAY_VIEW = 'SHOW_TODAY_VIEW';

const INITIAL_STATE = {
  snuzeTimes: {
    sleepTime: '',
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
