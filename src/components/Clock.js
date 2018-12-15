import './Clock.css';
import React from 'react';

const Clock = props => {
  const [, time, meridiem] = props.currentTime.match(
    /(\d{2}:\d{2}:\d{2}) (AM|PM)/
  );

  return (
    <div className="clock-container">
      <div className="border">
        <span className="time">{time}</span> {meridiem}
      </div>
    </div>
  );
};

export default Clock;
