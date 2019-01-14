import React, { Component } from 'react';
import moment from 'moment';
import 'moment-timer';
import { grommet, Box, Grommet } from 'grommet';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import Clock from './Clock';
import ButtonDisplay from './ButtonDisplay';
import TodayView from './TodayView';
import SplashScreen from './SplashScreen';
import actionCreators from '../actions';
import constants from '../constants';

const appConfig = {
  appName: 'SnuzeTime 💤🕙'
};

export class App extends Component {
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
    if (newDate !== date) {
      // it's a new day
      // trigger a refresh in TodayView component
      this.props.showTodayView(false);
    }

    const newTimes = {
      withSeconds: this.getCurrentTime(),
      withoutSeconds: this.getCurrentTime(false),
      hour: this.getCurrentHour(),
      date: newDate
    };
    this.props.updateCurrentTimes(newTimes);

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

  getCurrentDate() {
    return moment().format('YYYY M D');
  }

  getCurrentTime(withSeconds = true) {
    return moment().format(`hh:mm${withSeconds ? ':ss' : ''} A`);
  }

  getCurrentHour() {
    return Number(moment().format('HH'));
  }

  getBackground(currentHour) {
    return currentHour >= 7 && currentHour < 19 ? 'light-1' : 'dark-1';
  }

  render() {
    return (
      <Grommet full theme={grommet}>
        {!this.props.mainAppShown ? (
          <SplashScreen appName={appConfig.appName} />
        ) : (
          <Box
            fill
            background={this.getBackground(this.props.currentTimes.hour)}
          >
            <Navbar title={appConfig.appName} />
            <Box flex>
              <Clock />
              <Box flex align="center" justify="center">
                <ButtonDisplay />
                <TodayView />
              </Box>
            </Box>
          </Box>
        )}
      </Grommet>
    );
  }
}

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
)(App);
