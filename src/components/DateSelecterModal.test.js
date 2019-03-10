import React from 'react';
import { shallow } from 'enzyme';
import { Anchor, Box, Button, Calendar, Layer } from 'grommet';
import { Close } from 'grommet-icons';
import { DateSelecterModal } from './DateSelecterModal';

describe('DateSelecterModal', () => {
  describe('renders', () => {
    const wrapper = shallow(<DateSelecterModal />);

    test('a grommet Layer', () => {
      expect(wrapper.find(Layer).length).toEqual(1);
    });

    test('a grommet Close icon inside an Anchor', () => {
      expect(wrapper.find({ icon: <Close /> }).length).toEqual(1);
      expect(wrapper.find({ icon: <Close /> }).is(Anchor)).toEqual(true);
    });

    test('a grommet Box component with medium width', () => {
      // this Box determines the width of the modal
      const expectedWidth = 'medium';
      expect(wrapper.find({ width: expectedWidth }).length).toEqual(1);
      expect(wrapper.find({ width: expectedWidth }).is(Box)).toEqual(true);
    });

    test('the correct background color', () => {
      const day = 10;
      const night = 22;

      // this test uses its own wrapper
      const wrapper = shallow(<DateSelecterModal currentHour={day} />);

      expect(
        wrapper.find({
          background: DateSelecterModal.prototype.getBackground(day)
        }).length
      ).toEqual(1);

      wrapper.setProps({ currentHour: night });
      expect(
        wrapper.find({
          background: DateSelecterModal.prototype.getBackground(night)
        }).length
      ).toEqual(1);
    });

    test('a grommet Calendar', () => {
      expect(wrapper.find(Calendar).length).toEqual(1);
    });

    test('Submit and Cancel buttons', () => {
      expect(wrapper.find({ label: 'Submit' }).length).toEqual(1);
      expect(wrapper.find({ label: 'Submit' }).is(Button)).toEqual(true);

      expect(wrapper.find({ label: 'Cancel' }).length).toEqual(1);
      expect(wrapper.find({ label: 'Cancel' }).is(Button)).toEqual(true);
    });
  });

  describe(`correctly passes 'hide' callback to`, () => {
    let mockHide, wrapper;

    beforeEach(() => {
      mockHide = jest.fn();
      wrapper = shallow(<DateSelecterModal hide={mockHide} />);
    });

    test('onEsc and onClickOutside props of Layer', () => {
      const mockHide = jest.fn();
      wrapper.setProps({ hide: mockHide });
      expect(wrapper.find(Layer).prop('onEsc')).toBe(mockHide);
      expect(wrapper.find(Layer).prop('onClickOutside')).toBe(mockHide);
    });

    test(`the Close icon's parent Anchor`, () => {
      expect(mockHide).not.toHaveBeenCalled();
      wrapper.find({ icon: <Close /> }).simulate('click');
      expect(mockHide).toHaveBeenCalledTimes(1);
    });

    test('the Cancel button', () => {
      expect(mockHide).not.toHaveBeenCalled();
      wrapper.find({ label: 'Cancel' }).simulate('click');
      expect(mockHide).toHaveBeenCalledTimes(1);
    });

    test('the Submit button', () => {
      expect(mockHide).not.toHaveBeenCalled();
      wrapper.find({ label: 'Submit' }).simulate('click');
      expect(mockHide).toHaveBeenCalledTimes(1);
    });
  });

  describe('exposes', () => {
    describe('getBackground which', () => {
      test('is a function', () => {
        expect(typeof DateSelecterModal.prototype.getBackground).toEqual(
          'function'
        );
      });

      test('gets the correct background color', () => {
        const nightColor = 'dark-1';
        const dayColor = 'light-1';
        expect(DateSelecterModal.prototype.getBackground(10)).toEqual(dayColor);
        expect(DateSelecterModal.prototype.getBackground(22)).toEqual(
          nightColor
        );
      });
    });

    describe('replaceSpaces which', () => {
      test('is a function', () => {
        expect(typeof DateSelecterModal.prototype.replaceSpaces).toEqual(
          'function'
        );
      });

      test('converts spaces in a string to dashes', () => {
        const toReplace = '2019 03 03';
        const expected = '2019-03-03';
        expect(DateSelecterModal.prototype.replaceSpaces(toReplace)).toEqual(
          expected
        );
      });
    });

    describe('getUpperBounds which', () => {
      test('is a function', () => {
        expect(typeof DateSelecterModal.prototype.getUpperBounds).toEqual(
          'function'
        );
      });

      test('returns the date of the day after the provided date', () => {
        let date = '2019 02 02';
        let nextDay = '2019-02-03';
        expect(DateSelecterModal.prototype.getUpperBounds(date)).toEqual(
          nextDay
        );

        date = '2019-02-28';
        nextDay = '2019-03-01';
        expect(DateSelecterModal.prototype.getUpperBounds(date)).toEqual(
          nextDay
        );

        // handles leap years
        date = '2020-02-28';
        nextDay = '2020-02-29';
        expect(DateSelecterModal.prototype.getUpperBounds(date)).toEqual(
          nextDay
        );
      });
    });
  });
});
