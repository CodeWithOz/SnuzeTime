import React from 'react';
import { connect } from 'react-redux';
import { Layer } from 'grommet';

export const Sidebar = ({ shown }) => {
  return shown ? (
    <Layer full="vertical" position="left">
      Sidebar
    </Layer>
  ) : null;
};

const mapStateToProps = ({ sidebarShown }) => {
  return { shown: sidebarShown };
};

export default connect(mapStateToProps)(Sidebar);
