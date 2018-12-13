import React, { Component } from 'react';
import Clock from './Clock';

class App extends Component {
  render() {
    return (
      <div>
        <Clock currentTime="02:49 AM" />
      </div>
    );
  }
}

export default App;
