import React, { Component } from 'react';
import { Box, Paragraph } from 'grommet';
import { connect } from 'react-redux';
import Button from './Button';
import actionCreators from '../actions';
import dateStore from '../helpers/dateStore';

const btnDisplayConfig = {
  wake: {
    text: '...waking up',
    snuzeTimeName: 'wakeTime',
    getArgs(timesObj) {
      const { wakeTime, getUpTime } = timesObj;
      return [wakeTime, getUpTime];
    }
  },
  getUp: {
    text: '...getting up',
    snuzeTimeName: 'getUpTime',
    getArgs(timesObj) {
      const { wakeTime, getUpTime } = timesObj;
      return [wakeTime, getUpTime];
    }
  }
};

export class ButtonDisplay extends Component {
  getButtons() {
    return {
      leftBtn: 'wake',
      rightBtn: 'getUp'
    };
  }

  saveTimesToLocalStorage(date, times) {
    dateStore.addTimesToLocalStorage(date, times);
  }

  render() {
    const { leftBtn, rightBtn } = this.getButtons();

    return (
      <Box flex align="center" justify="center">
        <Box fill flex align="center" justify="center">
          <Paragraph size="xlarge" textAlign="center">
            I am...
          </Paragraph>
          <Box direction="row">
            <Button
              active
              text={btnDisplayConfig[leftBtn].text}
              handleClick={() => {
                // need to update values in both localStorage and redux
                const { snuzeTimeName } = btnDisplayConfig[leftBtn];
                const { currentTime, snuzeTimes, date } = this.props;
                const newSnuzeTimes = {
                  ...snuzeTimes,
                  [snuzeTimeName]: currentTime
                };
                this.saveTimesToLocalStorage(date, newSnuzeTimes);
                const args = btnDisplayConfig[leftBtn].getArgs(newSnuzeTimes);
                this.props.updateSnuzeTimes(...args);
              }}
            />
            <Button
              active
              text={btnDisplayConfig[rightBtn].text}
              handleClick={() => {
                // need to update values in both localStorage and redux
                const { snuzeTimeName } = btnDisplayConfig[rightBtn];
                const { currentTime, snuzeTimes, date } = this.props;
                const newSnuzeTimes = {
                  ...snuzeTimes,
                  [snuzeTimeName]: currentTime
                };
                this.saveTimesToLocalStorage(date, newSnuzeTimes);
                const args = btnDisplayConfig[rightBtn].getArgs(newSnuzeTimes);
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
  currentTimes: { withoutSeconds, date },
  snuzeTimes
}) => {
  return { currentTime: withoutSeconds, date, snuzeTimes };
};

export default connect(
  mapStateToProps,
  { updateSnuzeTimes: actionCreators.updateSnuzeTimes }
)(ButtonDisplay);
