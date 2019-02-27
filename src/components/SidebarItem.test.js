import React from 'react';
import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';
import SidebarItem from './SidebarItem';

describe('SidebarItem', () => {
  const dest = '/';
  const wrapper = shallow(<SidebarItem dest={dest} />);

  describe('renders', () => {
    test('a NavLink', () => {
      expect(wrapper.find(NavLink).length).toEqual(1);
    });

    test(`a NavLink with the correct 'to' prop`, () => {
      expect(wrapper.find({ to: dest }).length).toEqual(1);
      expect(wrapper.find({ to: dest }).is(NavLink)).toEqual(true);
    });
  });

  test('correctly assigns the handleClick callback', () => {
    const mockHide = jest.fn();
    wrapper.setProps({ handleClick: mockHide });
    expect(mockHide).not.toHaveBeenCalled();
    wrapper.simulate('click');
    expect(mockHide).toHaveBeenCalledTimes(1);
  });
});
