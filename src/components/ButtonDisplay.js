import React, { Component } from 'react';
import { Box, Paragraph } from 'grommet';
import { connect } from 'react-redux';
import Button from './Button';
import actionCreators from '../actions';
import dateStore from '../helpers/dateStore';

const btnDisplayConfig = {
  sleep: {
    text: '...going to bed',
    snuzeTimeName: 'sleepTime',
    getArgs(timesObj) {
      // order of arguments for updateSnuzeTimes action creator
      const { sleepTime, wakeTime, getUpTime } = timesObj;
      return [sleepTime, wakeTime, getUpTime];
    }
  },
  wake: {
    text: '...waking up',
    snuzeTimeName: 'wakeTime',
    getArgs(timesObj) {
      const { sleepTime, wakeTime, getUpTime } = timesObj;
      return [sleepTime, wakeTime, getUpTime];
    }
  },
  getUp: {
    text: '...getting up',
    snuzeTimeName: 'getUpTime',
    getArgs(timesObj) {
      const { sleepTime, wakeTime, getUpTime } = timesObj;
      return [sleepTime, wakeTime, getUpTime];
    }
  }
};

export class ButtonDisplay extends Component {
  getButtons() {
    const { hour } = this.props;

    if (hour >= 18 || hour < 2) {
      // going to bed
      return {
        bigBtn: 'sleep',
        smallLeftBtn: 'wake',
        smallRightBtn: 'getUp'
      };
    } else if (hour >= 10 && hour < 18) {
      // getting up
      return {
        bigBtn: 'getUp',
        smallLeftBtn: 'wake',
        smallRightBtn: 'sleep'
      };
    } else {
      // waking up
      return {
        bigBtn: 'wake',
        smallLeftBtn: 'getUp',
        smallRightBtn: 'sleep'
      };
    }
  }

  saveTimesToLocalStorage(date, times) {
    dateStore.addTimesToLocalStorage(date, times);
  }

  render() {
    const { bigBtn, smallLeftBtn, smallRightBtn } = this.getButtons();

    return (
      <Box flex align="center" justify="center">
        <Box fill flex align="center" justify="center">
          <Paragraph textAlign="center">I am...</Paragraph>
          <Button
            primary
            style={{ height: '50px' }}
            text={btnDisplayConfig[bigBtn].text}
            handleClick={() => {
              // need to update values in both localStorage and redux
              const { snuzeTimeName } = btnDisplayConfig[bigBtn];
              const { currentTime, snuzeTimes, date } = this.props;
              const newSnuzeTimes = {
                ...snuzeTimes,
                [snuzeTimeName]: currentTime
              };
              this.saveTimesToLocalStorage(date, newSnuzeTimes);
              const args = btnDisplayConfig[bigBtn].getArgs(newSnuzeTimes);
              this.props.updateSnuzeTimes(...args);
            }}
          />
          <Box direction="row">
            <Button
              text={btnDisplayConfig[smallLeftBtn].text}
              handleClick={() => {
                // need to update values in both localStorage and redux
                const { snuzeTimeName } = btnDisplayConfig[smallLeftBtn];
                const { currentTime, snuzeTimes, date } = this.props;
                const newSnuzeTimes = {
                  ...snuzeTimes,
                  [snuzeTimeName]: currentTime
                };
                this.saveTimesToLocalStorage(date, newSnuzeTimes);
                const args = btnDisplayConfig[smallLeftBtn].getArgs(
                  newSnuzeTimes
                );
                this.props.updateSnuzeTimes(...args);
              }}
            />
            <Button
              text={btnDisplayConfig[smallRightBtn].text}
              handleClick={() => {
                // need to update values in both localStorage and redux
                const { snuzeTimeName } = btnDisplayConfig[smallRightBtn];
                const { currentTime, snuzeTimes, date } = this.props;
                const newSnuzeTimes = {
                  ...snuzeTimes,
                  [snuzeTimeName]: currentTime
                };
                this.saveTimesToLocalStorage(date, newSnuzeTimes);
                const args = btnDisplayConfig[smallRightBtn].getArgs(
                  newSnuzeTimes
                );
                this.props.updateSnuzeTimes(...args);
              }}
            />
          </Box>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = ({
  currentTimes: { withoutSeconds, hour, date },
  snuzeTimes
}) => {
  return { currentTime: withoutSeconds, hour, date, snuzeTimes };
};

export default connect(
  mapStateToProps,
  { updateSnuzeTimes: actionCreators.updateSnuzeTimes }
)(ButtonDisplay);
