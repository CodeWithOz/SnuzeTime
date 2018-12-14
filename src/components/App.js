import React, { Component } from 'react';
import Navbar from './Navbar';
import Clock from './Clock';
import ButtonDisplay from './ButtonDisplay';

class App extends Component {
  render() {
    return (
      <section>
        <Navbar title="SnuzeTime" />
        <Clock currentTime="02:49 AM" />
        <ButtonDisplay
          hour={10}
          saveSleepTime={e => console.log(e)}
          saveWakeTime={e => console.log(e)}
          saveGetUpTime={e => console.log(e)}
        />
      </section>
    );
  }
}

export default App;
