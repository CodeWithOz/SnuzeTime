import React from 'react';
import { shallow } from 'enzyme';
import { Anchor, Box, Layer } from 'grommet';
import { Close } from 'grommet-icons';
import DateSelecterModal from './DateSelecterModal';

describe('DateSelecterModal', () => {
  const wrapper = shallow(<DateSelecterModal />);

  describe('renders', () => {
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
  });

  describe(`correctly passes 'hide' callback to`, () => {
    test('onEsc and onClickOutside props of Layer', () => {
      const mockHide = jest.fn();
      wrapper.setProps({ hide: mockHide });
      expect(wrapper.find(Layer).prop('onEsc')).toBe(mockHide);
      expect(wrapper.find(Layer).prop('onClickOutside')).toBe(mockHide);
    });
  });
});
