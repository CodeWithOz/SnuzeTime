import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Anchor, Box, Button } from 'grommet';

const SidebarItem = ({ children, dest }) => {
  return (
    <Button hoverIndicator>
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
        >
          <Anchor as="span">{children}</Anchor>
        </NavLink>
      </Box>
    </Button>
  );
};

SidebarItem.propTypes = {
  dest: PropTypes.string.isRequired
};

export default SidebarItem;
