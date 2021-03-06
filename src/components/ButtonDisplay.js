import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  getClickHandler = btn => () => {
    // need to update values in both localStorage and redux
    const { snuzeTimeName } = btnDisplayConfig[btn];
    const { currentTime, snuzeTimes, date } = this.props;
    const newSnuzeTimes = {
      ...snuzeTimes,
      [snuzeTimeName]: currentTime
    };
    this.saveTimesToLocalStorage(date, newSnuzeTimes);
    const args = btnDisplayConfig[btn].getArgs(newSnuzeTimes);
    this.props.updateSnuzeTimes(...args);
  };

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
              handleClick={this.getClickHandler(leftBtn)}
            />
            <Button
              active
              text={btnDisplayConfig[rightBtn].text}
              handleClick={this.getClickHandler(rightBtn)}
            />
          </Box>
        </Box>
      </Box>
    );
  }
}

ButtonDisplay.propTypes = {
  currentTime: PropTypes.string,
  date: PropTypes.string.isRequired,
  snuzeTimes: PropTypes.exact({
    wakeTime: PropTypes.string.isRequired,
    getUpTime: PropTypes.string.isRequired
  }),
  updateSnuzeTimes: PropTypes.func.isRequired
};

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
