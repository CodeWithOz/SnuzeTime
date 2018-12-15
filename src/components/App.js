import React, { Component } from 'react';
import Navbar from './Navbar';
import Clock from './Clock';
import ButtonDisplay from './ButtonDisplay';
import TodayView from './TodayView';
import moment from 'moment';
import 'moment-timer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // TODO: improve the initial loading experience
      currentTime: '00:00:00 AM'
    };

    this.startTimer();
  }

  startTimer = () => {
    new moment.duration(1000).timer({ start: true, loop: true }, () => {
      this.setState({
        currentTime: moment().format('hh:mm:ss A')
      });
    });
  };

  render() {
    return (
      <section>
        <Navbar title="SnuzeTime" />
        <Clock currentTime={this.state.currentTime} />
        <ButtonDisplay
          hour={10}
          saveSleepTime={e => console.log(e)}
          saveWakeTime={e => console.log(e)}
          saveGetUpTime={e => console.log(e)}
        />
        <hr />
        <TodayView sleepTime="" wakeTime="" getUpTime="" />
      </section>
    );
  }
}

export default App;
