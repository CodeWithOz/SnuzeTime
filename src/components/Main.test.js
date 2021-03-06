import React from 'react';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import Main from './Main';
import SelectDay from './SelectDay';
import Today from './Today';

describe('Main', () => {
  describe('renders a Route', () => {
    test('whose component is Today', () => {
      const wrapper = shallow(<Main />);
      expect(wrapper.find({ component: Today }).length).toEqual(1);
      expect(wrapper.find({ component: Today }).is(Route)).toEqual(true);
    });

    test('whose component is SelectDay', () => {
      const wrapper = shallow(<Main />);
      expect(wrapper.find({ component: SelectDay }).length).toEqual(1);
      expect(wrapper.find({ component: SelectDay }).is(Route)).toEqual(true);
    });
  });
});
