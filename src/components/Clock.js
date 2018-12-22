import './Clock.css';
import React from 'react';
import { Box, Text } from 'grommet';

const Clock = props => {
  const [, time, meridiem] = props.currentTime.match(
    /(\d{2}:\d{2}:\d{2}) (AM|PM)/
  );

  return (
    <Box alignSelf="center" pad="medium">
      <div className="clock-container">
        <div className="border">
          <Text className="time" a11yTitle="time" size="large">
            {time}
          </Text>{' '}
          <Text a11yTitle="AM or PM" size="small">
            {meridiem}
          </Text>
        </div>
      </div>
    </Box>
  );
};

export default Clock;
