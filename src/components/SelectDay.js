import React, { Component } from 'react';
import { Box, Heading } from 'grommet';

const selectDayConfig = {
  defaultDateHeading: 'No date selected'
};

class SelectDay extends Component {
  renderDateHeading(date) {
    const renderedDate = date || selectDayConfig.defaultDateHeading;
    return (
      <Box fill align="center">
        <Heading level="2">{renderedDate}</Heading>
      </Box>
    );
  }

  render() {
    return this.renderDateHeading();
  }
}

export default SelectDay;
