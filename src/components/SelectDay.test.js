import React from 'react';
import { mount, shallow } from 'enzyme';
import { Anchor } from 'grommet';
import SelectDay from './SelectDay';
import DateSelecterModal from './DateSelecterModal';

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
      const spy = jest.spyOn(SelectDay.prototype, 'toggleDatePicker');

      // this wrapper is necessary to allow the function to be spied
      // before shallow-rendering the component
      // see https://github.com/airbnb/enzyme/issues/1081#issuecomment-324485036
      const wrapper = shallow(<SelectDay />);

      const dateHeadingWrapper = shallow(
        wrapper.instance().renderDateHeading()
      );
      expect(spy).not.toHaveBeenCalled();
      dateHeadingWrapper.find(Anchor).simulate('click');
      expect(spy).toHaveBeenCalledTimes(1);

      spy.mockRestore();
    });
  });

  describe('renders', () => {
    test(`date selecter modal according to 'showDatePicker' state`, () => {
      const wrapper = shallow(<SelectDay />);
      wrapper.setState({ showDatePicker: false });
      expect(wrapper.find(DateSelecterModal).length).toEqual(0);

      wrapper.setState({ showDatePicker: true });
      expect(wrapper.find(DateSelecterModal).length).toEqual(1);
    });
  });
});
