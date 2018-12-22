import React from 'react';
import { Box, Heading } from 'grommet';

const Navbar = props => {
  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="center"
      elevation="medium"
    >
      <Heading level="1" margin="none">
        {props.title}
      </Heading>
    </Box>
  );
};

export default Navbar;
