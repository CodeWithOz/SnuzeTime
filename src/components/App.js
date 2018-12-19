import React, { Component } from 'react';
import Navbar from './Navbar';
import Clock from './Clock';
import ButtonDisplay from './ButtonDisplay';
import TodayView from './TodayView';
import moment from 'moment';
import 'moment-timer';
import dateStore from '../helpers/dateStore';
import { RotateSpinLoader } from 'react-css-loaders';

function getCurrentTime(withSeconds = true) {
  return moment().format(`hh:mm${withSeconds ? ':ss' : ''} A`);
}

function getCurrentDate() {
  return moment().format('YYYY M D');
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // TODO: improve the initial loading experience
      // currently, the time is always initialized at midnight
      loaded: false,
      currentTime: '00:00:00 AM',
      currentHour: 0,
      currentDate: getCurrentDate(),
      wakeTime: '',
      getUpTime: '',
      sleepTime: ''
    };
  }

  componentDidMount() {
    this.fillStateFromLocalStorage();

    // save state to localStorage when user leaves/refreshes page
    window.addEventListener('beforeunload', this.saveStateToLocalStorage);

    this.startTimer();
  }

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
      this.setState({
        currentTime: getCurrentTime(),
        currentHour: Number(moment().format('HH')),
        currentDate: getCurrentDate()
      });
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

  render() {
    if (!this.state.loaded) {
      return <RotateSpinLoader />;
    } else {
      return (
        <section>
          <Navbar title="SnuzeTime" />
          <Clock currentTime={this.state.currentTime} />
          <ButtonDisplay
            hour={this.state.currentHour}
            saveSleepTime={this.saveSleepTime}
            saveWakeTime={this.saveWakeTime}
            saveGetUpTime={this.saveGetUpTime}
          />
          <hr />
          <TodayView
            sleepTime={this.state.sleepTime}
            wakeTime={this.state.wakeTime}
            getUpTime={this.state.getUpTime}
          />
        </section>
      );
    }
  }
}

export default App;
