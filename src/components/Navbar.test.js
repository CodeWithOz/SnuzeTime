import React from 'react';
import { mount } from 'enzyme';
import { Menu } from 'grommet-icons';
import Navbar from './Navbar';

describe('Navbar', () => {
  test('displays the supplied title', () => {
    const title = 'test title';
    const wrapper = mount(<Navbar title={title} />);
    expect(wrapper.text()).toContain(title);
  });

  test('displays a grommet menu icon', () => {
    const wrapper = mount(<Navbar />);
    expect(wrapper.find(Menu).length).toEqual(1);
  });
});
