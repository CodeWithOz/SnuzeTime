import React from 'react';
import { shallow, mount } from 'enzyme';
import { Box, Layer } from 'grommet';
import { Close } from 'grommet-icons';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  describe('renders', () => {
    test('a grommet Layer when shown', () => {
      const wrapper = shallow(<Sidebar shown />);
      expect(wrapper.find(Layer).length).toEqual(1);
    });

    test('a grommet Close icon when shown', () => {
      const wrapper = mount(<Sidebar shown />);
      expect(wrapper.find(Close).length).toEqual(1);
    });

    test('nothing when not shown', () => {
      const wrapper = shallow(<Sidebar shown={false} />);
      expect(wrapper.get(0)).toBeFalsy();
    });

    describe(`a grommet Box component with a width prop`, () => {
      // this Box determines the width of the sidebar
      const getOptions = size => {
        return { context: { size } };
      };

      test(`set to 'medium' on larger viewports`, () => {
        const expectedWidth = 'medium';
        const wrapper = shallow(<Sidebar shown />, getOptions('medium'));
        expect(wrapper.find({ width: expectedWidth }).length).toEqual(1);
        expect(wrapper.find({ width: expectedWidth }).is(Box)).toEqual(true);

        wrapper.setContext(getOptions('large'));
        expect(wrapper.find({ width: expectedWidth }).length).toEqual(1);

        wrapper.setContext(getOptions('xlarge'));
        expect(wrapper.find({ width: expectedWidth }).length).toEqual(1);
      });
    });
  });

  describe('appropriately passes the dismiss callback to', () => {
    let mockHide, wrapper;

    beforeEach(() => {
      mockHide = jest.fn();
      wrapper = mount(<Sidebar shown hide={mockHide} />);
    });

    test('the Layer', () => {
      expect(wrapper.find(Layer).props().onEsc).toBe(mockHide);
      expect(wrapper.find(Layer).props().onClickOutside).toBe(mockHide);
    });

    test('the close button', () => {
      expect(mockHide).not.toHaveBeenCalled();
      wrapper.find(Close).simulate('click');
      expect(mockHide).toHaveBeenCalledTimes(1);
    });
  });
});
