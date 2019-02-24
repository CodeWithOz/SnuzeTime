import React from 'react';
import { shallow } from 'enzyme';
import { Anchor, Box, Layer } from 'grommet';
import { Close } from 'grommet-icons';
import { NavLink } from 'react-router-dom';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  describe('when shown', () => {
    describe('renders', () => {
      test('a grommet Layer', () => {
        const wrapper = shallow(<Sidebar shown />);
        expect(wrapper.find(Layer).length).toEqual(1);
      });

      test('a grommet Close icon inside an Anchor', () => {
        const wrapper = shallow(<Sidebar shown />);
        expect(wrapper.find({ icon: <Close /> }).length).toEqual(1);
        expect(wrapper.find({ icon: <Close /> }).is(Anchor)).toEqual(true);
      });

      describe(`a grommet Box component with a width prop`, () => {
        // this Box determines the width of the sidebar
        const getOptions = size => {
          return { context: { size } };
        };

        test(`set to 'medium' on larger viewports`, () => {
          // by default the component fills up its container on small viewports
          const expectedWidth = 'medium';
          const wrapper = shallow(<Sidebar shown />, getOptions('medium'));
          expect(wrapper.find({ width: expectedWidth }).length).toEqual(1);
          expect(wrapper.find({ width: expectedWidth }).is(Box)).toEqual(true);

          wrapper.setContext(getOptions('large'));
          expect(wrapper.find({ width: expectedWidth }).length).toEqual(1);

          wrapper.setContext(getOptions('xlarge'));
          expect(wrapper.find({ width: expectedWidth }).length).toEqual(1);
        });
      });

      test('a NavLink to the homepage', () => {
        const wrapper = shallow(<Sidebar shown />);
        expect(wrapper.find({ to: '/' }).length).toEqual(1);
        expect(wrapper.find({ to: '/' }).is(NavLink)).toEqual(true);
      });
    });
  });

  describe('when not shown', () => {
    test('renders nothing', () => {
      const wrapper = shallow(<Sidebar shown={false} />);
      expect(wrapper.get(0)).toBeFalsy();
    });
  });

  describe('appropriately passes the dismiss callback to', () => {
    let mockHide, wrapper;

    beforeEach(() => {
      mockHide = jest.fn();
      wrapper = shallow(<Sidebar shown hide={mockHide} />);
    });

    test('the Layer', () => {
      expect(wrapper.find(Layer).props().onEsc).toBe(mockHide);
      expect(wrapper.find(Layer).props().onClickOutside).toBe(mockHide);
    });

    test('the Anchor containing the Close icon', () => {
      expect(mockHide).not.toHaveBeenCalled();
      wrapper.find({ icon: <Close /> }).simulate('click');
      expect(mockHide).toHaveBeenCalledTimes(1);
    });
  });
});
