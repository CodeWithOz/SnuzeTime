import './Clock.css';
import React from 'react';
import { Box } from 'grommet';

const Clock = props => {
  const [, time, meridiem] = props.currentTime.match(
    /(\d{2}:\d{2}:\d{2}) (AM|PM)/
  );

  return (
    <Box alignSelf="center" pad="medium">
      <div className="clock-container">
        <div className="border">
          <span className="time">{time}</span> {meridiem}
        </div>
      </div>
    </Box>
  );
};

export default Clock;
