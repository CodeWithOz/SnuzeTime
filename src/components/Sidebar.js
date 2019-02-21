import React from 'react';
import { Layer } from 'grommet';

const Sidebar = ({ shown }) => {
  return (
    shown && (
      <Layer full="vertical" position="left">
        Sidebar
      </Layer>
    )
  );
};

export default Sidebar;
