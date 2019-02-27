import React from 'react';
import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';
import SidebarItem from './SidebarItem';

describe('SidebarItem', () => {
  describe('correctly passes', () => {
    test('path prop to NavLink', () => {
      const dest = '/';
      const wrapper = shallow(<SidebarItem path={dest} />);
      expect(wrapper.find({ to: dest }).length).toEqual(1);
      expect(wrapper.find({ to: dest }).is(NavLink)).toEqual(true);
    });
  });
});
