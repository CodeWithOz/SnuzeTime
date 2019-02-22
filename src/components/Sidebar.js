import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Layer, Box, Anchor } from 'grommet';
import { Close } from 'grommet-icons';
import { toggleSidebar } from '../actions';

export const Sidebar = ({ shown, hide, background }) => {
  return shown ? (
    <Layer full="vertical" position="left" onEsc={hide} onClickOutside={hide}>
      <Box fill background={background}>
        <Box direction="row" align="center" justify="end" elevation="xsmall">
          <Anchor icon={<Close />} onClick={hide} />
        </Box>
        Sidebar
      </Box>
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
