import React, { Component } from 'react';
import { Anchor, Box, Heading, Text } from 'grommet';
import DateSelecterModal from './DateSelecterModal';

const selectDayConfig = {
  defaultDateHeading: 'No date selected'
};

class SelectDay extends Component {
  constructor(props) {
    super(props);

    this.state = { showDatePicker: false };

    this.toggleDatePicker = this.toggleDatePicker.bind(this);
  }

  toggleDatePicker() {
    const { showDatePicker } = this.state;
    this.setState({ showDatePicker: !showDatePicker });
  }

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
          <Anchor onClick={this.toggleDatePicker}>Pick a date</Anchor>
        </Text>
      </Box>
    );
  }

  render() {
    return (
      <Box fill>
        {this.state.showDatePicker && (
          <DateSelecterModal hide={this.toggleDatePicker} />
        )}
        {this.renderDateHeading()}
      </Box>
    );
  }
}

export default SelectDay;
