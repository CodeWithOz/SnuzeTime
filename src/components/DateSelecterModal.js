import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Anchor, Box, Button, Calendar, Layer } from 'grommet';
import { Close } from 'grommet-icons';
import moment from 'moment';

export class DateSelecterModal extends Component {
  getBackground(currentHour) {
    return currentHour >= 7 && currentHour < 19 ? 'light-1' : 'dark-1';
  }

  getUpperBounds(date) {
    date = this.replaceSpaces(date);
    return moment(date)
      .add(1, 'days')
      .format('YYYY-MM-DD');
  }

  replaceSpaces(date) {
    // convert to an ISO8601 date string
    return date.replace(/ /g, '-');
  }

  render() {
    const { currentHour, hide } = this.props;

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
          <Calendar />
          <Box direction="row" align="center" justify="center" border="top">
            <Button label="Submit" margin="small" onClick={hide} test="ha" />
            <Button label="Cancel" margin="small" onClick={hide} />
          </Box>
        </Box>
      </Layer>
    );
  }
}

DateSelecterModal.propTypes = {
  hide: PropTypes.func
};

const mapStateToProps = ({ currentTimes: { hour } }) => {
  return { currentHour: hour };
};

export default connect(mapStateToProps)(DateSelecterModal);
