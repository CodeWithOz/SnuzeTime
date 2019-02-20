import React from 'react';
import { Anchor, Box, Heading } from 'grommet';
import { Menu } from 'grommet-icons';

const Navbar = props => {
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
        {props.title}
      </Heading>
      <Box />
      {/* this Box is a hack to center the title and justify the menu to the left */}
    </Box>
  );
};

export default Navbar;
