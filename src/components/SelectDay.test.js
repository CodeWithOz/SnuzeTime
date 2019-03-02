import { mount } from 'enzyme';
import SelectDay from './SelectDay';

describe('SelectDay', () => {
  describe('exposes renderDateHeading which', () => {
    test('is a function', () => {
      expect(typeof SelectDay.prototype.renderDateHeading).toEqual('function');
    });

    describe('renders', () => {
      const defaultText = 'No date selected';
      const suppliedDate = '02 Mar 2019';
      test('default text when no date is supplied', () => {
        const wrapper = mount(SelectDay.prototype.renderDateHeading(''));
        expect(wrapper.text()).toContain(defaultText);
        expect(wrapper.text()).not.toContain(suppliedDate);
      });

      test('the supplied date', () => {
        const wrapper = mount(
          SelectDay.prototype.renderDateHeading(suppliedDate)
        );
        expect(wrapper.text()).not.toContain(defaultText);
        expect(wrapper.text()).toContain(suppliedDate);
      });
    });
  });
});
