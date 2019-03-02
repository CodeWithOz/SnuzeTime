import React from 'react';
import { mount, shallow } from 'enzyme';
import { Anchor } from 'grommet';
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

      test('a link to the date picker', () => {
        const wrapper = shallow(SelectDay.prototype.renderDateHeading(''));
        expect(wrapper.find(Anchor).length).toEqual(1);
        // this test will be made more specific in due time
      });
    });
  });

  describe('exposes toggleDatePicker which', () => {
    const wrapper = shallow(<SelectDay />);

    test('is a function', () => {
      expect(typeof wrapper.instance().toggleDatePicker).toEqual('function');
    });

    test(`reverses 'showDatePicker' piece of state`, () => {
      const curVal = wrapper.state('showDatePicker');
      wrapper.instance().toggleDatePicker();
      expect(wrapper.state('showDatePicker')).toEqual(!curVal);
    });

    test('is called when link to date picker is clicked', () => {
      const spy = jest.spyOn(wrapper.instance(), 'toggleDatePicker');
      expect(spy).not.toHaveBeenCalled();
      wrapper.find(Anchor).simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);

      spy.mockRestore();
    });
  });
});
