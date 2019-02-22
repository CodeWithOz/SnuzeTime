import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layer } from 'grommet';
import { toggleSidebar } from '../actions';

export const Sidebar = ({ shown, hide }) => {
  return shown ? (
    <Layer full="vertical" position="left" onEsc={hide} onClickOutside={hide}>
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
