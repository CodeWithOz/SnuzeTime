import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-timer';
import { Box, Grommet } from 'grommet';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Clock from './Clock';
import ButtonDisplay from './ButtonDisplay';
import TodayView from './TodayView';
import SplashScreen from './SplashScreen';
import actionCreators from '../actions';
import constants from '../constants';

export const todayConfig = {
  appName: 'SnuzeTime 💤🕙'
};

export class Today extends Component {
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

    if (!this.props.mainAppShown) {
      // show the main app if all currentTimes have been set
      const { currentTimes: initialTimes } = constants.INITIAL_STATE;
      if (
        withSeconds !== initialTimes.withSeconds &&
        withoutSeconds !== initialTimes.withoutSeconds &&
        hour !== initialTimes.hour &&
        date !== initialTimes.date
      ) {
        this.props.showMainApp(true);
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
      <Box fill>
        <Navbar title={todayConfig.appName} />
        <Box flex>
          <Clock />
          <Box flex align="center" justify="center">
            <ButtonDisplay />
            <TodayView />
          </Box>
        </Box>
      </Box>
    );
  };

  render() {
    return (
      <Grommet full theme={todayConfig.customTheme}>
        {!this.props.mainAppShown ? (
          <SplashScreen appName={todayConfig.appName} />
        ) : (
          this.renderToday()
        )}
      </Grommet>
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
  showTodayView: PropTypes.func,
  mainAppShown: PropTypes.bool,
  showMainApp: PropTypes.func
};

const mapStateToProps = ({ currentTimes, mainAppShown }) => {
  return { currentTimes, mainAppShown };
};

export default connect(
  mapStateToProps,
  {
    showTodayView: actionCreators.showTodayView,
    showMainApp: actionCreators.showMainApp,
    updateCurrentTimes: actionCreators.updateCurrentTimes
  }
)(Today);
