import React from 'react';
import { shallow, mount } from 'enzyme';
import { Layer } from 'grommet';
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
