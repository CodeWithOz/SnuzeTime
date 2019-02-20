import React from 'react';
import { mount } from 'enzyme';
import Navbar from './Navbar';

test('Navbar displays the supplied title', () => {
  const title = 'test title';
  const wrapper = mount(<Navbar title={title} />);
  expect(wrapper.text()).toContain(title);
});
