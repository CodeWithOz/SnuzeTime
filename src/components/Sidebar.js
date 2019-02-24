import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Anchor, Box, Button, Layer } from 'grommet';
import { Close } from 'grommet-icons';
import { NavLink } from 'react-router-dom';
import { toggleSidebar } from '../actions';

export const Sidebar = ({ shown, hide, background }, { size }) => {
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
          justify="end"
          elevation="xsmall"
        >
          <Anchor icon={<Close />} onClick={hide} />
        </Box>
        <Button hoverIndicator>
          <Box elevation="small">
            <NavLink
              exact
              to="/"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                textAlign: 'center',
                padding: '1.5em'
              }}
            >
              <Anchor as="span">Today</Anchor>
            </NavLink>
          </Box>
        </Button>
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
