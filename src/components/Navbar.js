import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Box, Heading } from 'grommet';
import { Menu } from 'grommet-icons';

const Navbar = ({ title }) => {
  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="between"
      elevation="medium"
    >
      <Anchor icon={<Menu />} />
      <Heading level="1" margin="none">
        {title}
      </Heading>
      <Box />
      {/* this Box is a hack to center the title and justify the menu to the left */}
    </Box>
  );
};

Navbar.propTypes = {
  title: PropTypes.string
};

export default Navbar;
