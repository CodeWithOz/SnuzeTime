import dateStore from './dateStore';

const mockDay = {
  sleepTime: '10:30 PM',
  wakeTime: '06:00 AM',
  getUpTime: '06:30 AM'
};
const mockOctober = new Map([['6', mockDay]]); // October 6
const mock2018 = new Map([['10', mockOctober]]);
const mockStore = new Map([['2018', mock2018]]);
const dateWithData = '2018 10 6';
const dateWithoutData = '2018 4 2';

describe('Converting from Map to string and back', () => {
  test('produces an identical Map', () => {
    const storeAsString = dateStore.mapToString(mockStore);
    const revivedMap = dateStore.stringToMap(storeAsString);
    expect(mockStore).toEqual(revivedMap);
  });
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
