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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // TODO: improve the initial loading experience
      // currently, the time is always initialized at midnight
      currentTime: '00:00:00 AM',
      currentHour: 0,
      wakeTime: '',
      getUpTime: '',
      sleepTime: ''
    };

    this.startTimer();
  }

  startTimer = () => {
    new moment.duration(1000).timer({ start: true, loop: true }, () => {
      this.setState({
        currentTime: getCurrentTime(),
        currentHour: Number(moment().format('HH'))
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
