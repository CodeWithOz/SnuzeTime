import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Anchor, Box, Button } from 'grommet';

const SidebarItem = ({ children, dest, handleClick }) => {
  return (
    <Button hoverIndicator onClick={handleClick}>
      <Box elevation="small">
        <NavLink
          exact
          to={dest}
          style={{
            textDecoration: 'none',
            color: 'inherit',
            textAlign: 'center',
            padding: '1.5em'
          }}
          activeStyle={{
            backgroundColor: 'rgba(184, 184, 184, 0.5)'
          }}
        >
          <Anchor as="span">{children}</Anchor>
        </NavLink>
      </Box>
    </Button>
  );
};

SidebarItem.propTypes = {
  dest: PropTypes.string.isRequired,
  handleClick: PropTypes.func
};

export default SidebarItem;
