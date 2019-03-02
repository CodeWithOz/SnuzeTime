import { shallow } from 'enzyme';
import SelectDay from './SelectDay';

describe('SelectDay', () => {
  describe('exposes renderDateHeading which', () => {
    test('is a function', () => {
      expect(typeof SelectDay.prototype.renderDateHeading).toEqual('function');
    });

    describe('renders', () => {
      const defaultText = 'No date selected';
      test('default text when no date is supplied', () => {
        const wrapper = shallow(SelectDay.prototype.renderDateHeading(''));
        expect(wrapper.text()).toContain(defaultText);
      });
    });
  });
});
