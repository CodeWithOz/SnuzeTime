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

// 2 functions to convert back and forth between Map object and JSON string
// see https://stackoverflow.com/a/49399615/7987987
function replacer(key, value) {
  if (value.__proto__ == Map.prototype) {
    return {
      _type: 'map',
      map: [...value]
    };
  } else return value;
}

function reviver(key, value) {
  if (value._type == 'map') return new Map(value.map);
  else return value;
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
    this.getTimesFromLocalStorage();
    this.startTimer();
  }

  getTimesFromLocalStorage() {
    // see https://hackernoon.com/how-to-take-advantage-of-local-storage-in-your-react-projects-a895f2b2d3f2

    // exit if neither localStorage API nor dates key is available
    if (!window.localStorage || !localStorage.dates) return;

    const datesStore = JSON.parse(localStorage.dates, reviver);
    const { sleepTime, wakeTime, getUpTime } = this.getTodaysTimes(
      this.state.currentDate,
      datesStore
    );
    this.setState({ sleepTime, wakeTime, getUpTime });
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
