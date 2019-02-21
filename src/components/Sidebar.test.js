import React from 'react';
import { shallow } from 'enzyme';
import { Layer } from 'grommet';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  describe('renders', () => {
    test('a grommet Layer when shown', () => {
      const wrapper = shallow(<Sidebar shown />);
      expect(wrapper.find(Layer).length).toEqual(1);
    });

    test('nothing when not shown', () => {
      const wrapper = shallow(<Sidebar shown={false} />);
      expect(wrapper.get(0)).toBeFalsy();
    });
  });
});
