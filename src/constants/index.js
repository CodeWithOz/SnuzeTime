const UPDATE_SNUZE_TIMES = 'UPDATE_SNUZE_TIMES';
const UPDATE_CURRENT_TIMES = 'UPDATE_CURRENT_TIMES';

const INITIAL_STATE = {
  snuzeTimes: {
    sleepTime: '',
    wakeTime: '',
    getUpTime: ''
  },
  currentTimes: {
    withSeconds: '',
    withoutSeconds: '',
    hour: -1,
    date: ''
  }
};

export default {
  UPDATE_SNUZE_TIMES,
  UPDATE_CURRENT_TIMES,
  INITIAL_STATE
};
