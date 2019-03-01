import React from 'react';
import { Route } from 'react-router-dom';
import { Box } from 'grommet';
import SelectDay from './SelectDay';
import Today from './Today';

const Main = () => {
  return (
    <Box fill>
      <Route path="/" exact component={Today} />
      <Route path="/selectday" exact component={SelectDay} />
    </Box>
  );
};

export default Main;
