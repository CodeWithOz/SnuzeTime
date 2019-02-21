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

  test('assign handleClick callback to the menu icon', () => {
    const mockCallback = jest.fn();
    const wrapper = mount(<Navbar handleClick={mockCallback} />);
    expect(mockCallback).not.toHaveBeenCalled();
    wrapper.find(Menu).simulate('click');
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
