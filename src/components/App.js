import React, { Component } from 'react';
import moment from 'moment';
import 'moment-timer';
import { grommet, Box, Grommet } from 'grommet';
import Navbar from './Navbar';
import Clock from './Clock';
import ButtonDisplay from './ButtonDisplay';
import TodayView from './TodayView';
import SplashScreen from './SplashScreen';
import dateStore from '../helpers/dateStore';

const appConfig = {
  appName: 'SnuzeTime 💤🕙'
};

class App extends Component {
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
    this.setCurrentTimeAndDate();
    this.fillStateFromLocalStorage();
    this.startTimer();
  }

  setCurrentTimeAndDate = () => {
    const newDate = this.getCurrentDate();
    if (newDate !== this.state.currentDate) {
      // it's a new day
      // refresh snuze times after updating the date
      // necessary because fillStateFromLocalStorage uses state's current date
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
  };

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

  startTimer = () => {
    new moment.duration(1000).timer({ start: true, loop: true }, () => {
      this.setCurrentTimeAndDate();
      if (!this.state.loaded) {
        // start showing the main content
        this.setState({ loaded: true });
      }
    });
  };

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

export default App;
