import React from 'react';
import { shallow } from 'enzyme';
import { Layer } from 'grommet';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  test('renders a grommet Layer', () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper.find(Layer).length).toEqual(1);
  });
});
