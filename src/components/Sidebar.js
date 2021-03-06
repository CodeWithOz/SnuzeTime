import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Anchor, Box, Layer } from 'grommet';
import { Close } from 'grommet-icons';
import { toggleSidebar } from '../actions';
import SidebarItem from './SidebarItem';

export const sidebarConfig = {
  items: [
    { dest: '/', text: 'Today' },
    { dest: '/selectday', text: 'Select a day' }
  ]
};

export class Sidebar extends Component {
  renderItems() {
    return sidebarConfig.items.map((item, index) => {
      return (
        <SidebarItem key={index} handleClick={this.props.hide} dest={item.dest}>
          {item.text}
        </SidebarItem>
      );
    });
  }

  render() {
    const { shown, hide, background } = this.props;
    return shown ? (
      <Layer
        responsive={false}
        full="vertical"
        position="left"
        onEsc={hide}
        onClickOutside={hide}
      >
        <Box fill background={background}>
          <Box
            width="medium"
            direction="row"
            align="center"
            justify="start"
            elevation="xsmall"
          >
            <Anchor icon={<Close />} onClick={hide} />
          </Box>
          {this.renderItems()}
        </Box>
      </Layer>
    ) : null;
  }
}

Sidebar.propTypes = {
  shown: PropTypes.bool,
  hide: PropTypes.func,
  background: PropTypes.string
};

const mapStateToProps = ({ sidebarShown }) => {
  return { shown: sidebarShown };
};

export default connect(
  mapStateToProps,
  { hide: toggleSidebar }
)(Sidebar);
