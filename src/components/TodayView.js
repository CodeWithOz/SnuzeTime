import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, Paragraph, Text } from 'grommet';
import { RotateSpinLoader } from 'react-css-loaders';
import { connect } from 'react-redux';
import moment from 'moment';
import dateStore from '../helpers/dateStore';
import actionCreators from '../actions';

const todayViewConfig = {
  messages: {
    wakeTime: `...haven't woken up.`,
    getUpTime: `...haven't gotten out of bed.`
  }
};

export class TodayView extends Component {
  componentDidMount() {
    this.fillStateFromLocalStorage();
  }

  fillStateFromLocalStorage() {
    if (!this.props.shown) {
      // fill redux state with values from localStorage
      const { wakeTime, getUpTime } = this.getTimesFromLocalStorage(
        this.props.date
      );
      this.props.updateSnuzeTimes(wakeTime, getUpTime);
      this.props.showTodayView(true);
    }
  }

  getTimesFromLocalStorage(date) {
    return dateStore.getTimesFromLocalStorage(date);
  }

  componentDidUpdate() {
    this.fillStateFromLocalStorage();
  }

  getSpinnerColor(currentHour) {
    // returns the reverse of the main background to ensure contrast
    return currentHour >= 7 && currentHour < 19 ? '#333333' : '#F8F8F8';
  }

  getTimeDiff(start, end) {
    start = moment(start, 'YYYY M D hh:mm A');
    end = moment(end, 'YYYY M D hh:mm A');
    return moment(start).from(end, true);
  }

  showTimeInBed() {
    let { wakeTime, getUpTime } = this.props;

    if (wakeTime && getUpTime) {
      // prepend current date to snuze times
      wakeTime = `${this.props.date} ${wakeTime}`;
      getUpTime = `${this.props.date} ${getUpTime}`;

      const timeInBed = this.getTimeDiff(wakeTime, getUpTime);
      const timeIsSmall = isTimeSmall(timeInBed);
      return (
        <Paragraph
          size="large"
          color={timeIsSmall ? 'green' : 'red'}
        >{`...spent ${timeInBed} in bed.`}</Paragraph>
      );

      function isTimeSmall(timeString) {
        // threshold is 15 minutes
        const rgx = /(second|(a|1[0-5]|\b\d) minute)/;
        return rgx.test(timeString);
      }
    }
  }

  render() {
    const wakeTime = this.props.wakeTime
      ? `...woke up at ${this.props.wakeTime}.`
      : todayViewConfig.messages.wakeTime;
    const getUpTime = this.props.getUpTime
      ? `...got out of bed at ${this.props.getUpTime}.`
      : todayViewConfig.messages.getUpTime;

    return (
      <Box flex align="center" justify="center">
        {!this.props.shown ? (
          <RotateSpinLoader
            size={2}
            color={this.getSpinnerColor(this.props.hour)}
          />
        ) : (
          <Box fill flex align="center" justify="center">
            <Box>
              <Text weight="bold" size="large">
                Today, you...
              </Text>
            </Box>
            <Box>
              <Paragraph>{wakeTime}</Paragraph>
              <Paragraph>{getUpTime}</Paragraph>
              {this.showTimeInBed()}
            </Box>
          </Box>
        )}
      </Box>
    );
  }
}

TodayView.propTypes = {
  shown: PropTypes.bool,
  date: PropTypes.string.isRequired,
  updateSnuzeTimes: PropTypes.func.isRequired,
  showTodayView: PropTypes.func.isRequired,
  wakeTime: PropTypes.string,
  getUpTime: PropTypes.string,
  hour: PropTypes.number
};

const mapStateToProps = ({
  snuzeTimes: { wakeTime, getUpTime },
  currentTimes: { date, hour },
  todayViewShown
}) => {
  return { wakeTime, getUpTime, date, hour, shown: todayViewShown };
};

export default connect(
  mapStateToProps,
  {
    updateSnuzeTimes: actionCreators.updateSnuzeTimes,
    showTodayView: actionCreators.showTodayView
  }
)(TodayView);
