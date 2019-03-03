import React from 'react';
import { shallow } from 'enzyme';
import { Layer } from 'grommet';
import DateSelecterModal from './DateSelecterModal';

describe('DateSelecterModal', () => {
  describe('renders', () => {
    test('a grommet Layer', () => {
      const wrapper = shallow(<DateSelecterModal />);
      expect(wrapper.find(Layer).length).toEqual(1);
    });
  });
});
