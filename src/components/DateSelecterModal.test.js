import React from 'react';
import { shallow } from 'enzyme';
import { Anchor, Box, Button, Calendar, Layer } from 'grommet';
import { Close } from 'grommet-icons';
import { DateSelecterModal } from './DateSelecterModal';

describe('DateSelecterModal', () => {
  const date = '2019 02 01';

  describe('renders', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<DateSelecterModal date={date} />);
    });

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

      wrapper.setProps({ currentHour: day });

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

    describe('a grommet Calendar', () => {
      test('with the correct bounds', () => {
        const lowerBound = '2018-01-01';
        const isoDate = DateSelecterModal.prototype.replaceSpaces(date);

        expect(wrapper.find(Calendar).prop('bounds')).toEqual([
          lowerBound,
          isoDate
        ]);
      });

      test('with the currently selected date', () => {
        expect(wrapper.state('selectedDate')).toEqual(undefined); // initial state

        expect(wrapper.find(Calendar).prop('date')).toEqual(
          wrapper.state('selectedDate')
        );

        // update the selected date
        wrapper.setState({ selectedDate: '2018-03-12' });
        expect(wrapper.find(Calendar).prop('date')).toEqual(
          wrapper.state('selectedDate')
        );
      });
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
      wrapper = shallow(<DateSelecterModal hide={mockHide} date={date} />);
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

    describe('getDate which', () => {
      test('is a function', () => {
        expect(typeof DateSelecterModal.prototype.getDate).toEqual('function');
      });

      test('returns only the first 10 characters of the supplied time string', () => {
        const timeString = '2019-03-05T16:42:08.407Z';
        expect(DateSelecterModal.prototype.getDate(timeString)).toEqual(
          timeString.slice(0, 10)
        );
      });
    });

    describe('handleSelect which', () => {
      let wrapper;

      beforeEach(() => {
        wrapper = shallow(<DateSelecterModal date={date} />);
      });

      test('is a function', () => {
        expect(typeof wrapper.instance().handleSelect).toEqual('function');
      });

      describe('updates state with', () => {
        const selectedDate = '2019-03-05T16:42:08.407Z';

        test(`the selected date when it's different from the currently selected date`, () => {
          expect(wrapper.state('selectedDate')).toEqual(undefined); // no date currently selected
          wrapper.instance().handleSelect(selectedDate);
          expect(wrapper.state('selectedDate')).toEqual(
            selectedDate.slice(0, 10)
          );
        });

        test(`undefined when it's the same as the currently selected date`, () => {
          const trimmedDate = selectedDate.slice(0, 10);

          // set currently selected date
          wrapper.setState({ selectedDate: trimmedDate });

          wrapper.instance().handleSelect(selectedDate);
          expect(wrapper.state('selectedDate')).toEqual(undefined);
        });
      });
    });
  });
});
