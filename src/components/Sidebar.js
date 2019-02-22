import React from 'react';
import { Layer } from 'grommet';

export const Sidebar = ({ shown }) => {
  return shown ? (
    <Layer full="vertical" position="left">
      Sidebar
    </Layer>
  ) : null;
};

export default Sidebar;
