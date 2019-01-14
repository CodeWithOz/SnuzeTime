import React, { Component } from 'react';
import { Box, Paragraph, Text } from 'grommet';
import { connect } from 'react-redux';
import dateStore from '../helpers/dateStore';
import actionCreators from '../actions';

const todayViewConfig = {
  messages: {
    sleepTime: `...haven't gone to bed.`,
    wakeTime: `...haven't woken up.`,
    getUpTime: `...haven't gotten out of bed.`
  }
};

export class TodayView extends Component {
  getTimesFromLocalStorage(date) {
    return dateStore.getTimesFromLocalStorage(date);
  }

  componentDidMount() {
    // fill redux state with values from localStorage
    const { sleepTime, wakeTime, getUpTime } = this.getTimesFromLocalStorage(
      this.props.date
    );
    this.props.updateSnuzeTimes(sleepTime, wakeTime, getUpTime);
  }

  getSpinnerColor(currentHour) {
    // returns the reverse of the main background to ensure contrast
    return currentHour >= 7 && currentHour < 19 ? '#333333' : '#F8F8F8';
  }

  render() {
    const sleepTime = this.props.sleepTime
      ? `...slept at ${this.props.sleepTime}.`
      : todayViewConfig.messages.sleepTime;
    const wakeTime = this.props.wakeTime
      ? `...woke up at ${this.props.wakeTime}.`
      : todayViewConfig.messages.wakeTime;
    const getUpTime = this.props.getUpTime
      ? `...got out of bed at ${this.props.getUpTime}.`
      : todayViewConfig.messages.getUpTime;

    return (
      <Box flex align="center" justify="center">
        <Box fill flex align="center" justify="center">
          <Box>
            <Text weight="bold" size="large">
              Today, you...
            </Text>
          </Box>
          <Box>
            <Paragraph>{wakeTime}</Paragraph>
            <Paragraph>{getUpTime}</Paragraph>
            <Paragraph>{sleepTime}</Paragraph>
          </Box>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = ({
  snuzeTimes: { sleepTime, wakeTime, getUpTime },
  currentTimes: { date }
}) => {
  return { sleepTime, wakeTime, getUpTime, date };
};

export default connect(
  mapStateToProps,
  { updateSnuzeTimes: actionCreators.updateSnuzeTimes }
)(TodayView);
