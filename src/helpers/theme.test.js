import theme from './theme';

describe('theme object', () => {
  test('has a get method', () => {
    expect(theme.get).toBeDefined();
  });

  describe('has a get method that', () => {
    describe('returns an object', () => {
      test('with the correct global.colors.bkgrnd property', () => {
        const nightBkgrnd = '#323334';
        const dayBkrgnd = '#fff';

        const settings = { currentHour: '23' }; // night
        expect(theme.get(settings).global.colors.bkgrnd).toBeDefined();
        expect(theme.get(settings).global.colors.bkgrnd).toEqual(nightBkgrnd);

        settings.currentHour = '09'; // morning
        expect(theme.get(settings).global.colors.bkgrnd).toEqual(dayBkrgnd);
      });
    });
  });
});
