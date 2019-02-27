import React from 'react';
import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';
import SidebarItem from './SidebarItem';

describe('SidebarItem', () => {
  describe('renders', () => {
    const dest = '/';
    const wrapper = shallow(<SidebarItem dest={dest} />);

    test('a NavLink', () => {
      expect(wrapper.find(NavLink).length).toEqual(1);
    });

    test(`a NavLink with the correct 'to' prop`, () => {
      expect(wrapper.find({ to: dest }).length).toEqual(1);
      expect(wrapper.find({ to: dest }).is(NavLink)).toEqual(true);
    });
  });
});
