import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layer, Box } from 'grommet';
import { Close } from 'grommet-icons';
import { toggleSidebar } from '../actions';

export const Sidebar = ({ shown, hide }) => {
  return shown ? (
    <Layer full="vertical" position="left" onEsc={hide} onClickOutside={hide}>
      <Box
        direction="horizontal"
        align="center"
        justify="end"
        elevation="small"
      >
        <Close />
      </Box>
      Sidebar
    </Layer>
  ) : null;
};

Sidebar.propTypes = {
  shown: PropTypes.bool,
  hide: PropTypes.func
};

const mapStateToProps = ({ sidebarShown }) => {
  return { shown: sidebarShown };
};

export default connect(
  mapStateToProps,
  { hide: toggleSidebar }
)(Sidebar);
