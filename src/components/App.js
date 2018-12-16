import React, { Component } from 'react';
import Navbar from './Navbar';
import Clock from './Clock';
import ButtonDisplay from './ButtonDisplay';
import TodayView from './TodayView';
import moment from 'moment';
import 'moment-timer';

function getCurrentTime(withSeconds = true) {
  return moment().format(`hh:mm${withSeconds ? ':ss' : ''} A`);
}

function getCurrentDate() {
  return moment().format('YYYY M D');
}

function parseDate(date) {
  return date.match(/^(\d{4}) (\d{1,2}) (\d{1,2})$/);
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // TODO: improve the initial loading experience
      // currently, the time is always initialized at midnight
      currentTime: '00:00:00 AM',
      currentHour: 0,
      currentDate: getCurrentDate(),
      wakeTime: '',
      getUpTime: '',
      sleepTime: ''
    };
  }

  componentDidMount() {
    // TODO: hydrate state from local storage
    this.startTimer();
  }

  getTodaysTimes(date, store) {
    const [, year, month, day] = parseDate(date);
    if (
      store.has(year) &&
      store.get(year).has(month) &&
      store
        .get(year)
        .get(month)
        .has(day)
    ) {
      const { sleepTime, wakeTime, getUpTime } = store
        .get(year)
        .get(month)
        .get(day);
      return { sleepTime, wakeTime, getUpTime };
    }

    // date is not on record
    return { sleepTime: '', wakeTime: '', getUpTime: '' };
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

export default App;
