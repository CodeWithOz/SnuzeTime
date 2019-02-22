import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Anchor, Box, Heading } from 'grommet';
import { Menu } from 'grommet-icons';
import { toggleSidebar } from '../actions';

export const Navbar = ({ title, toggleSidebar }) => {
  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="between"
      elevation="medium"
    >
      <Anchor onClick={toggleSidebar} icon={<Menu />} />
      <Heading level="1" margin="none">
        {title}
      </Heading>
      <Box />
      {/* this Box is a hack to center the title and justify the menu to the left */}
    </Box>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  toggleSidebar: PropTypes.func
};

export default connect(
  null,
  { toggleSidebar }
)(Navbar);
