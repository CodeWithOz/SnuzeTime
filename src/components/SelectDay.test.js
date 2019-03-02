import SelectDay from './SelectDay';

describe('SelectDay', () => {
  describe('exposes renderDateHeading which', () => {
    test('is a function', () => {
      expect(typeof SelectDay.prototype.renderDateHeading).toEqual('function');
    });
  });
});
