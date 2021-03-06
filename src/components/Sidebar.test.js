import React from 'react';
import { shallow } from 'enzyme';
import { Anchor, Box, Layer } from 'grommet';
import { Close } from 'grommet-icons';
import { Sidebar, sidebarConfig } from './Sidebar';
import SidebarItem from './SidebarItem';

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

      test('a grommet Box component with medium width', () => {
        // this Box determines the width of the sidebar
        const expectedWidth = 'medium';
        const wrapper = shallow(<Sidebar shown />);
        expect(wrapper.find({ width: expectedWidth }).length).toEqual(1);
        expect(wrapper.find({ width: expectedWidth }).is(Box)).toEqual(true);
      });

      test('a SidebarItem for each item in its config', () => {
        const wrapper = shallow(<Sidebar shown />);
        sidebarConfig.items.forEach(item => {
          expect(wrapper.find({ dest: item.dest }).length).toEqual(1);
          expect(wrapper.find({ dest: item.dest }).is(SidebarItem)).toEqual(
            true
          );
        });
      });
    });
  });

  describe('when not shown', () => {
    test('renders nothing', () => {
      const wrapper = shallow(<Sidebar shown={false} />);
      expect(wrapper.get(0)).toBeFalsy();
    });
  });

  describe('appropriately passes the hide callback to', () => {
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

    test('each sidebar item', () => {
      const sidebarItems = wrapper.find(SidebarItem);

      for (let i = 0; i < sidebarItems.length; i++) {
        expect(sidebarItems.at(i).props().handleClick).toBe(mockHide);
      }
    });
  });

  describe('has a config object with a sidebar item for', () => {
    test('the home page', () => {
      const homepageDest = '/';
      expect(
        sidebarConfig.items.filter(item => item.dest === homepageDest).length
      ).toEqual(1);
    });

    test('the selectday page', () => {
      const selectDayDest = '/selectday';
      expect(
        sidebarConfig.items.filter(item => item.dest === selectDayDest).length
      ).toEqual(1);
    });
  });
});
