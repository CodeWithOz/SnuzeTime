import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-timer';
import { Box } from 'grommet';
import { connect } from 'react-redux';
import { RotateSpinLoader } from 'react-css-loaders';
import Clock from './Clock';
import ButtonDisplay from './ButtonDisplay';
import TodayView from './TodayView';
import actionCreators from '../actions';
import constants from '../constants';

export class Today extends Component {
  state = { shown: false };

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    new moment.duration(1000).timer({ start: true, loop: true }, () => {
      this.setCurrentTimeAndDate();
    });
  }

  setCurrentTimeAndDate() {
    const { withSeconds, withoutSeconds, hour, date } = this.props.currentTimes;
    const newDate = this.getCurrentDate();
    const isNewDay = newDate !== date;

    const newTimes = {
      withSeconds: this.getCurrentTime(),
      withoutSeconds: this.getCurrentTime(false),
      hour: this.getCurrentHour(),
      date: newDate
    };
    this.props.updateCurrentTimes(newTimes);

    if (isNewDay) {
      // trigger a refresh of TodayView for the new date
      this.props.showTodayView(false);
    }

    if (!this.state.shown) {
      const { currentTimes: initialTimes } = constants.INITIAL_STATE;
      // check if all currentTimes have been set
      if (
        withSeconds !== initialTimes.withSeconds &&
        withoutSeconds !== initialTimes.withoutSeconds &&
        hour !== initialTimes.hour &&
        date !== initialTimes.date
      ) {
        // show the main app
        this.setState({ shown: true });
      }
    }
  }

  getCurrentDate() {
    return moment().format('YYYY M D');
  }

  getCurrentTime(withSeconds = true) {
    return moment().format(`hh:mm${withSeconds ? ':ss' : ''} A`);
  }

  getCurrentHour() {
    return Number(moment().format('HH'));
  }

  getSpinnerColor(currentHour) {
    // returns the reverse of the main background to ensure contrast
    return currentHour >= 7 && currentHour < 19 ? '#333333' : '#F8F8F8';
  }

  renderToday = () => {
    return (
      <Box flex>
        <Clock />
        <Box flex align="center" justify="center">
          <ButtonDisplay />
          <TodayView />
        </Box>
      </Box>
    );
  };

  render() {
    return !this.state.shown ? (
      <RotateSpinLoader
        size={7}
        color={this.getSpinnerColor(this.props.currentTimes.hour)}
      />
    ) : (
      this.renderToday()
    );
  }
}

Today.propTypes = {
  currentTimes: PropTypes.exact({
    withSeconds: PropTypes.string,
    withoutSeconds: PropTypes.string,
    hour: PropTypes.number,
    date: PropTypes.string
  }),
  updateCurrentTimes: PropTypes.func,
  showTodayView: PropTypes.func
};

const mapStateToProps = ({ currentTimes }) => {
  return { currentTimes };
};

export default connect(
  mapStateToProps,
  {
    showTodayView: actionCreators.showTodayView,
    updateCurrentTimes: actionCreators.updateCurrentTimes
  }
)(Today);
