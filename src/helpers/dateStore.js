function mapToString(map) {
  return JSON.stringify(map, replacer);
}

function replacer(key, value) {
  // see https://stackoverflow.com/a/49399615/7987987
  if (value.__proto__ === Map.prototype) {
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
  if (value._type === 'map') return new Map(value.map);
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

function add(date, times, store) {
  const [, year, month, day] = parseDate(date);

  if (store.has(year) && store.get(year).has(month)) {
    // records available for this month so add day
    // .set() will overwrite the data for the current day if they exist
    // or add them if they don't
    // which is the behaviour we want
    store
      .get(year)
      .get(month)
      .set(day, times);
  } else if (store.has(year)) {
    // has records for year but not month
    // so create the day and add it to the month
    const newMonth = new Map([[day, times]]);
    store.get(year).set(month, newMonth);
  } else {
    // doesn't have records for the year
    // so create the record and add it
    const newMonth = new Map([[day, times]]);
    const newYear = new Map([[month, newMonth]]);
    store.set(year, newYear);
  }
}

function addStoreToLocalStorage(store) {
  // exit if localStorage is not available
  if (!window.localStorage) return;

  const storeAsString = mapToString(store);
  localStorage.setItem('dates', storeAsString);
}

function getStoreFromLocalStorage() {
  // return an empty Map if localStorage is not available
  if (!window.localStorage) return new Map();

  const storeAsString = localStorage.getItem('dates');
  return storeAsString === null ? new Map() : stringToMap(storeAsString);
}

function addTimesToLocalStorage(date, times) {
  const storeMap = getStoreFromLocalStorage();
  add(date, times, storeMap);
  addStoreToLocalStorage(storeMap);
}

function getTimesFromLocalStorage(date) {
  const storeMap = getStoreFromLocalStorage();
  return find(date, storeMap);
}

export default {
  mapToString,
  stringToMap,
  find,
  add,
  addStoreToLocalStorage,
  getStoreFromLocalStorage,
  addTimesToLocalStorage,
  getTimesFromLocalStorage
};
