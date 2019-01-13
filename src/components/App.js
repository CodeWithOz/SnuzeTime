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
import dateStore from '../helpers/dateStore';
import actionCreators from '../actions';
import constants from '../constants';

const appConfig = {
  appName: 'SnuzeTime 💤🕙'
};

export class App extends Component {
  state = {
    loaded: false,
    currentTime: '',
    currentHour: this.getCurrentHour(),
    currentDate: this.getCurrentDate(),
    wakeTime: '',
    getUpTime: '',
    sleepTime: ''
  };

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    new moment.duration(1000).timer({ start: true, loop: true }, () => {
      this.setCurrentTimeAndDate();
      if (!this.state.loaded) {
        // start showing the main content
        this.setState({ loaded: true });
      }
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

    if (newDate !== this.state.currentDate) {
      this.setState(
        {
          currentTime: this.getCurrentTime(),
          currentHour: this.getCurrentHour(),
          currentDate: newDate
        },
        this.fillStateFromLocalStorage
      );
    } else {
      this.setState({
        currentTime: this.getCurrentTime(),
        currentHour: this.getCurrentHour(),
        currentDate: newDate
      });
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

  fillStateFromLocalStorage = () => {
    const { sleepTime, wakeTime, getUpTime } = this.getTimesFromLocalStorage(
      this.state.currentDate
    );
    this.setState({ sleepTime, wakeTime, getUpTime });
  };

  getTimesFromLocalStorage(date) {
    // see https://hackernoon.com/how-to-take-advantage-of-local-storage-in-your-react-projects-a895f2b2d3f2
    return dateStore.getTimesFromLocalStorage(date);
  }

  // update state and localStorage with the newest snuze time
  saveSnuzeTimes = (sleep = false, wake = false, getUp = false) => {
    let particularTime;

    if (sleep) {
      particularTime = 'sleepTime';
    } else if (wake) {
      particularTime = 'wakeTime';
    } else if (getUp) {
      particularTime = 'getUpTime';
    } else {
      return;
    }

    this.setState(
      { [particularTime]: this.getCurrentTime(false) },
      this.saveStateToLocalStorage
    );
  };

  saveStateToLocalStorage = () => {
    const { sleepTime, wakeTime, getUpTime } = this.state;
    this.saveTimesToLocalStorage(this.state.currentDate, {
      sleepTime,
      wakeTime,
      getUpTime
    });
  };

  saveTimesToLocalStorage(date, times) {
    dateStore.addTimesToLocalStorage(date, times);
  }

  saveSleepTime = () => {
    this.saveSnuzeTimes(true);
  };

  saveWakeTime = () => {
    this.saveSnuzeTimes(false, true);
  };

  saveGetUpTime = () => {
    this.saveSnuzeTimes(false, false, true);
  };

  getBackground(currentHour) {
    return currentHour >= 7 && currentHour < 19 ? 'light-1' : 'dark-1';
  }

  getSpinnerColor(currentHour) {
    // returns the reverse of the main background to ensure contrast
    return currentHour >= 7 && currentHour < 19 ? '#333333' : '#F8F8F8';
  }

  render() {
    return (
      <Grommet full theme={grommet}>
        {!this.state.loaded ? (
          <SplashScreen appName={appConfig.appName} />
        ) : (
          <Box fill background={this.getBackground(this.state.currentHour)}>
            <Navbar title={appConfig.appName} />
            <Box flex>
              <Clock />
              <Box flex align="center" justify="center">
                <ButtonDisplay
                  hour={this.state.currentHour}
                  saveSleepTime={this.saveSleepTime}
                  saveWakeTime={this.saveWakeTime}
                  saveGetUpTime={this.saveGetUpTime}
                />
                <TodayView />
              </Box>
            </Box>
          </Box>
        )}
      </Grommet>
    );
  }
}

const mapStateToProps = ({ currentTimes }) => {
  return { currentTimes };
};

export default connect(
  mapStateToProps,
  {
    showTodayView: actionCreators.showTodayView,
    showMainApp: actionCreators.showMainApp,
    updateCurrentTimes: actionCreators.updateCurrentTimes
  }
)(App);
