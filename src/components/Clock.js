import './Clock.css';
import React from 'react';
import { Box, Text } from 'grommet';
import { connect } from 'react-redux';

export const Clock = props => {
  const [, time, meridiem] = props.currentTime.match(
    /(\d{2}:\d{2}:\d{2}) (AM|PM)/
  );

  return (
    <Box
      alignSelf="center"
      pad={{ bottom: 'medium', horizontal: 'medium', top: 'large' }}
    >
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

const mapStateToProps = ({ currentTimes: { withSeconds } }) => {
  return { currentTime: withSeconds };
};

export default connect(mapStateToProps)(Clock);
