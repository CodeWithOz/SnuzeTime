function mapToString(map) {
  return JSON.stringify(map, replacer);
}

function replacer(key, value) {
  // see https://stackoverflow.com/a/49399615/7987987
  if (value.__proto__ == Map.prototype) {
    return {
      _type: 'map',
      map: [...value]
    };
  } else return value;
}

function stringToMap(mapString) {
  return JSON.parse(mapString, reviver);
}

function reviver(key, value) {
  // see https://stackoverflow.com/a/49399615/7987987
  if (value._type == 'map') return new Map(value.map);
  else return value;
}

function find(date, store) {
  const [, year, month, day] = parseDate(date);
  if (
    store.has(year) &&
    store.get(year).has(month) &&
    store
      .get(year)
      .get(month)
      .has(day)
  ) {
    const { sleepTime, wakeTime, getUpTime } = store
      .get(year)
      .get(month)
      .get(day);
    return { sleepTime, wakeTime, getUpTime };
  }

  // date is not on record
  return { sleepTime: '', wakeTime: '', getUpTime: '' };
}

function parseDate(date) {
  return date.match(/^(\d{4}) (\d{1,2}) (\d{1,2})$/);
}

export default {
  mapToString,
  stringToMap,
  find
};
