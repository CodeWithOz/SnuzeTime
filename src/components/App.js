import React, { Component } from 'react';
import Navbar from './Navbar';
import Clock from './Clock';

class App extends Component {
  render() {
    return (
      <section>
        <Navbar title="SnuzeTime" />
        <Clock currentTime="02:49 AM" />
      </section>
    );
  }
}

export default App;
