import App from './App';

describe('From localStorage, App gets', () => {
  const mockDay = {
    sleepTime: '10:30 PM',
    wakeTime: '06:00 AM',
    getUpTime: '06:30 AM'
  };
  const dateWithData = '2018 10 6';
  const dateWithoutData = '2018 4 2';

  afterEach(() => {
    if (localStorage.getItem('dates') !== null)
      localStorage.removeItem('dates');
  });

  test('the same times it saves to localStorage', () => {
    App.prototype.saveTimesToLocalStorage(dateWithData, mockDay);
    const {
      sleepTime,
      wakeTime,
      getUpTime
    } = App.prototype.getTimesFromLocalStorage(dateWithData);

    expect(sleepTime).toEqual(mockDay.sleepTime);
    expect(wakeTime).toEqual(mockDay.wakeTime);
    expect(getUpTime).toEqual(mockDay.getUpTime);
  });

  test('empty strings for dates with no saved records', () => {
    const {
      sleepTime,
      wakeTime,
      getUpTime
    } = App.prototype.getTimesFromLocalStorage(dateWithoutData);

    expect(sleepTime).toEqual('');
    expect(wakeTime).toEqual('');
    expect(getUpTime).toEqual('');
  });
});

test('App gets the correct background color', () => {
  expect(App.prototype.getBackground).toBeDefined();

  const dayBkrgnd = 'light-1';
  const nightBkgrnd = 'dark-1';
  expect(App.prototype.getBackground(10)).toEqual(dayBkrgnd);
  expect(App.prototype.getBackground(22)).toEqual(nightBkgrnd);
});

test('App gets the correct spinner color', () => {
  expect(App.prototype.getSpinnerColor).toBeDefined();

  const nightColor = '#F8F8F8';
  const dayColor = '#333333';
  expect(App.prototype.getSpinnerColor(10)).toEqual(dayColor);
  expect(App.prototype.getSpinnerColor(22)).toEqual(nightColor);
});
