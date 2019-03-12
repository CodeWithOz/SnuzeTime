import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Anchor, Box, Button, Calendar, Layer } from 'grommet';
import { Close } from 'grommet-icons';

const selecterConfig = {
  lowerBound: '2018-01-01'
};

export class DateSelecterModal extends Component {
  state = { selectedDate: undefined };

  getBackground(currentHour) {
    return currentHour >= 7 && currentHour < 19 ? 'light-1' : 'dark-1';
  }

  replaceSpaces(date) {
    // convert to an ISO8601 date string
    return date.replace(/ /g, '-');
  }

  getDate(date) {
    // remove the time portion of the date string
    return date.slice(0, 10);
  }

  handleSelect = selectedDate => {
    selectedDate = this.getDate(selectedDate);
    selectedDate =
      selectedDate !== this.state.selectedDate ? selectedDate : undefined;
    this.setState({ selectedDate });
  };

  render() {
    const { currentHour, date, hide } = this.props;

    return (
      <Layer responsive={false} onEsc={hide} onClickOutside={hide}>
        <Box fill background={this.getBackground(currentHour)}>
          <Box
            width="medium"
            direction="row"
            align="center"
            justify="end"
            border="bottom"
          >
            <Anchor icon={<Close />} onClick={hide} />
          </Box>
          <Calendar
            date={this.state.selectedDate}
            bounds={[selecterConfig.lowerBound, this.replaceSpaces(date)]}
            onSelect={this.handleSelect}
          />
          <Box direction="row" align="center" justify="center" border="top">
            <Button label="Submit" margin="small" onClick={hide} />
            <Button label="Cancel" margin="small" onClick={hide} />
          </Box>
        </Box>
      </Layer>
    );
  }
}

DateSelecterModal.propTypes = {
  hide: PropTypes.func,
  currentHour: PropTypes.number,
  date: PropTypes.string.isRequired
};

const mapStateToProps = ({ currentTimes: { date, hour } }) => {
  return { currentHour: hour, date };
};

export default connect(mapStateToProps)(DateSelecterModal);
