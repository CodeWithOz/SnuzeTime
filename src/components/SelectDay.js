import React, { Component } from 'react';
import { Anchor, Box, Heading, Text } from 'grommet';

const selectDayConfig = {
  defaultDateHeading: 'No date selected'
};

class SelectDay extends Component {
  renderDateHeading(date) {
    const renderedDate = date || selectDayConfig.defaultDateHeading;
    return (
      <Box fill align="center">
        <Heading
          level="2"
          textAlign="center"
          margin={{
            bottom: 'small'
          }}
        >
          {renderedDate}
        </Heading>
        <Text size="small" textAlign="center">
          <Anchor>Pick a date</Anchor>
        </Text>
      </Box>
    );
  }

  render() {
    return this.renderDateHeading();
  }
}

export default SelectDay;
