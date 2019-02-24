import React from 'react';
import { Route } from 'react-router-dom';
import { Box } from 'grommet';
import Today from './Today';

const Main = () => {
  return (
    <Box fill>
      <Route path="/" exact component={Today} />
    </Box>
  );
};

export default Main;
