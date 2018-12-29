import React, { Component } from 'react';
import Navbar from './Navbar';
import Clock from './Clock';
import ButtonDisplay from './ButtonDisplay';
import TodayView from './TodayView';
import moment from 'moment';
import 'moment-timer';
import dateStore from '../helpers/dateStore';
import { RotateSpinLoader } from 'react-css-loaders';
import { Box, Grommet } from 'grommet';
import theme from '../helpers/theme';

function getCurrentTime(withSeconds = true) {
  return moment().format(`hh:mm${withSeconds ? ':ss' : ''} A`);
}

function getCurrentDate() {
  return moment().format('YYYY M D');
}

function getCurrentHour() {
  return Number(moment().format('HH'));
}

class App extends Component {
  state = {
    loaded: false,
    currentTime: '',
    currentHour: 0,
    currentDate: getCurrentDate(),
    wakeTime: '',
    getUpTime: '',
    sleepTime: ''
  };

  componentDidMount() {
    this.setCurrentTimeAndDate();
    this.fillStateFromLocalStorage();

    // save state to localStorage when user leaves/refreshes page
    window.addEventListener('beforeunload', this.saveStateToLocalStorage);

    this.startTimer();
  }

  setCurrentTimeAndDate = () => {
    this.setState({
      currentTime: getCurrentTime(),
      currentHour: getCurrentHour(),
      currentDate: getCurrentDate()
    });
  };

  fillStateFromLocalStorage() {
    const { sleepTime, wakeTime, getUpTime } = this.getTimesFromLocalStorage(
      this.state.currentDate
    );
    this.setState({ sleepTime, wakeTime, getUpTime });
  }

  getTimesFromLocalStorage(date) {
    // see https://hackernoon.com/how-to-take-advantage-of-local-storage-in-your-react-projects-a895f2b2d3f2

    return dateStore.getTimesFromLocalStorage(date);
  }

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

  componentWillUnmount() {
    // prevent event listener from running after component is unmounted
    window.removeEventListener('beforeunload', this.saveStateToLocalStorage);

    // save state to localStorage if component has a chance to unmount
    this.saveStateToLocalStorage();
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

  saveSleepTime = () => {
    this.setState({ sleepTime: getCurrentTime(false) });
  };

  saveWakeTime = () => {
    this.setState({ wakeTime: getCurrentTime(false) });
  };

  saveGetUpTime = () => {
    this.setState({ getUpTime: getCurrentTime(false) });
  };

  getTheme() {
    return theme.get({ currentHour: getCurrentHour() });
  }

  render() {
    return (
      <Grommet full theme={this.getTheme()}>
        {!this.state.loaded ? (
          <RotateSpinLoader />
        ) : (
          <Box fill background="bkgrnd">
            <Navbar title="SnuzeTime" />
            <Box flex>
              <Clock currentTime={this.state.currentTime} />
              <Box flex align="center" justify="center">
                <ButtonDisplay
                  hour={this.state.currentHour}
                  saveSleepTime={this.saveSleepTime}
                  saveWakeTime={this.saveWakeTime}
                  saveGetUpTime={this.saveGetUpTime}
                />
                <TodayView
                  sleepTime={this.state.sleepTime}
                  wakeTime={this.state.wakeTime}
                  getUpTime={this.state.getUpTime}
                />
              </Box>
            </Box>
          </Box>
        )}
      </Grommet>
    );
  }
}

export default App;
