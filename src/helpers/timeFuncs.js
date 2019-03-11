import moment from 'moment';

export function getCurrentHour() {
  return Number(moment().format('HH'));
}

export function getCurrentDate() {
  return moment().format('YYYY M D');
}

export default { getCurrentHour, getCurrentDate };
