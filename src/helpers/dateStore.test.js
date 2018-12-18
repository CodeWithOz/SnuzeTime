import dateStore from './dateStore';

const dateWithData = '2018 10 6';
const dateWithoutData = '2018 4 2';
let mockDay, mockOctober, mock2018, mockStore;

beforeEach(() => {
  mockDay = {
    sleepTime: '10:30 PM',
    wakeTime: '06:00 AM',
    getUpTime: '06:30 AM'
  };
  mockOctober = new Map([['6', mockDay]]); // October 6
  mock2018 = new Map([['10', mockOctober]]);
  mockStore = new Map([['2018', mock2018]]);
});

afterEach(() => {
  if (localStorage.getItem('dates') !== null) localStorage.removeItem('dates');
});

describe('Finding data in the Map', () => {
  test('returns the correct info', () => {
    const { sleepTime, wakeTime, getUpTime } = dateStore.find(
      dateWithData,
      mockStore
    );
    expect(sleepTime).toEqual(mockDay.sleepTime);
    expect(wakeTime).toEqual(mockDay.wakeTime);
    expect(getUpTime).toEqual(mockDay.getUpTime);
  });

  test('returns empty strings when no data is present', () => {
    const { sleepTime, wakeTime, getUpTime } = dateStore.find(
      dateWithoutData,
      mockStore
    );
    expect(sleepTime).toEqual('');
    expect(wakeTime).toEqual('');
    expect(getUpTime).toEqual('');
  });
});

describe('Updating the Map', () => {
  describe('with a date in a new year', () => {
    let newDate, newTimes;

    beforeEach(() => {
      newDate = '2019 9 18';
      newTimes = {
        sleepTime: '09:50PM',
        wakeTime: '04:30 AM',
        getUpTime: '05:00 AM'
      };
    });

    test('adds the supplied info correctly', () => {
      dateStore.add(newDate, newTimes, mockStore);
      const { sleepTime, wakeTime, getUpTime } = dateStore.find(
        newDate,
        mockStore
      );
      expect(sleepTime).toEqual(newTimes.sleepTime);
      expect(wakeTime).toEqual(newTimes.wakeTime);
      expect(getUpTime).toEqual(newTimes.getUpTime);
    });

    test(`doesn't overwrite previous data`, () => {
      dateStore.add(newDate, newTimes, mockStore);
      const { sleepTime, wakeTime, getUpTime } = dateStore.find(
        dateWithData,
        mockStore
      );
      expect(sleepTime).toEqual(mockDay.sleepTime);
      expect(wakeTime).toEqual(mockDay.wakeTime);
      expect(getUpTime).toEqual(mockDay.getUpTime);
    });
  });

  describe('with a date in a new month', () => {
    let newDate, newTimes;

    beforeEach(() => {
      newDate = '2018 9 18';
      newTimes = {
        sleepTime: '10:50PM',
        wakeTime: '06:30 AM',
        getUpTime: '07:00 AM'
      };
    });

    test('adds the supplied info correctly', () => {
      dateStore.add(newDate, newTimes, mockStore);
      const { sleepTime, wakeTime, getUpTime } = dateStore.find(
        newDate,
        mockStore
      );
      expect(sleepTime).toEqual(newTimes.sleepTime);
      expect(wakeTime).toEqual(newTimes.wakeTime);
      expect(getUpTime).toEqual(newTimes.getUpTime);
    });

    test(`doesn't overwrite previous data`, () => {
      dateStore.add(newDate, newTimes, mockStore);
      const { sleepTime, wakeTime, getUpTime } = dateStore.find(
        dateWithData,
        mockStore
      );
      expect(sleepTime).toEqual(mockDay.sleepTime);
      expect(wakeTime).toEqual(mockDay.wakeTime);
      expect(getUpTime).toEqual(mockDay.getUpTime);
    });
  });

  describe('with a new day', () => {
    let newDate, newTimes;

    beforeEach(() => {
      newDate = '2018 10 7';
      newTimes = {
        sleepTime: '11:50PM',
        wakeTime: '07:30 AM',
        getUpTime: '08:00 AM'
      };
    });

    test('adds the supplied info correctly', () => {
      dateStore.add(newDate, newTimes, mockStore);
      const { sleepTime, wakeTime, getUpTime } = dateStore.find(
        newDate,
        mockStore
      );
      expect(sleepTime).toEqual(newTimes.sleepTime);
      expect(wakeTime).toEqual(newTimes.wakeTime);
      expect(getUpTime).toEqual(newTimes.getUpTime);
    });

    test(`doesn't overwrite previous data`, () => {
      dateStore.add(newDate, newTimes, mockStore);
      const { sleepTime, wakeTime, getUpTime } = dateStore.find(
        dateWithData,
        mockStore
      );
      expect(sleepTime).toEqual(mockDay.sleepTime);
      expect(wakeTime).toEqual(mockDay.wakeTime);
      expect(getUpTime).toEqual(mockDay.getUpTime);
    });
  });

  describe('with a currently recorded day', () => {
    let newTimes;

    beforeEach(() => {
      newTimes = {
        sleepTime: '11:50PM',
        wakeTime: '07:30 AM',
        getUpTime: '08:00 AM'
      };
    });

    test('overwrites the previous data', () => {
      dateStore.add(dateWithData, newTimes, mockStore);
      const { sleepTime, wakeTime, getUpTime } = dateStore.find(
        dateWithData,
        mockStore
      );

      expect(sleepTime).toEqual(newTimes.sleepTime);
      expect(wakeTime).toEqual(newTimes.wakeTime);
      expect(getUpTime).toEqual(newTimes.getUpTime);
    });
  });
});

describe('Converting from Map to string and back', () => {
  test('produces an identical Map', () => {
    let storeAsString = dateStore.mapToString(mockStore);
    let revivedMap = dateStore.stringToMap(storeAsString);
    expect(mockStore).toEqual(revivedMap);

    // ensure that it handles changed data
    dateStore.add(
      '2018 12 3',
      { sleepTime: '09:00 PM', wakeTime: '05:45 AM', getUpTime: '06:10 AM' },
      mockStore
    );
    storeAsString = dateStore.mapToString(mockStore);
    revivedMap = dateStore.stringToMap(storeAsString);
    expect(mockStore).toEqual(revivedMap);
  });
});

describe('Adding to localStorage', () => {
  describe('from a Map store', () => {
    test('adds the converted string to the dates property', () => {
      // nothing has been added yet
      expect(localStorage.getItem('dates')).toBeNull();

      dateStore.addStoreToLocalStorage(mockStore);

      // convert store to string to check against localStorage value
      const storeAsString = dateStore.mapToString(mockStore);
      expect(localStorage.getItem('dates')).toEqual(storeAsString);
    });
  });
});

describe('Getting a map from localStorage', () => {
  // honestly I'm not sure what to test here
  // I will test if the added Map matches the returned one
  // but this feels pointless because it doesn't check any
  // interaction with localStorage
  describe('if the dates property already exists', () => {
    test('returns the original map store', () => {
      dateStore.addStoreToLocalStorage(mockStore);
      const revivedMap = dateStore.getStoreFromLocalStorage();
      expect(revivedMap).toEqual(mockStore);
    });
  });

  describe(`if the dates property doesn't exists`, () => {
    test('returns an empty Map', () => {
      // confirm that nothing currently exists
      expect(localStorage.getItem('dates')).toBeNull();

      const emptyMap = new Map();
      const revivedMap = dateStore.getStoreFromLocalStorage();
      expect(revivedMap).toEqual(emptyMap);
    });
  });
});
