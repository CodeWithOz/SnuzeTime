import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layer, Box, Anchor } from 'grommet';
import { Close } from 'grommet-icons';
import { NavLink } from 'react-router-dom';
import { toggleSidebar } from '../actions';

export const Sidebar = ({ shown, hide, background }, { size }) => {
  return shown ? (
    <Layer full="vertical" position="left" onEsc={hide} onClickOutside={hide}>
      <Box fill background={background}>
        <Box direction="row" align="center" justify="end" elevation="xsmall">
          <Anchor onClick={hide}>
            <Close />
          </Anchor>
        </Box>
        <Box justify="center" width={size !== 'small' && 'medium'}>
          <NavLink to="/">
            <Anchor>Today</Anchor>
          </NavLink>
        </Box>
      </Box>
    </Layer>
  ) : null;
};

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
