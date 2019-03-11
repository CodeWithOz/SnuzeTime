import moment from 'moment';

export function getCurrentHour() {
  return Number(moment().format('HH'));
}

export function getCurrentDate() {}

export default { getCurrentHour };
