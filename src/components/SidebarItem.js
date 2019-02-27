import React from 'react';
import { NavLink } from 'react-router-dom';
import { Anchor, Box, Button } from 'grommet';

const SidebarItem = ({ path }) => {
  return (
    <Button hoverIndicator>
      <Box elevation="small">
        <NavLink
          exact
          to={path}
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
  );
};

export default SidebarItem;
