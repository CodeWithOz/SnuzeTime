import React from 'react';
import { Box, Paragraph, Text } from 'grommet';
import { connect } from 'react-redux';

const todayViewConfig = {
  messages: {
    sleepTime: `...haven't gone to bed.`,
    wakeTime: `...haven't woken up.`,
    getUpTime: `...haven't gotten out of bed.`
  }
};

export const TodayView = props => {
  const sleepTime = props.sleepTime
    ? `...slept at ${props.sleepTime}.`
    : todayViewConfig.messages.sleepTime;
  const wakeTime = props.wakeTime
    ? `...woke up at ${props.wakeTime}.`
    : todayViewConfig.messages.wakeTime;
  const getUpTime = props.getUpTime
    ? `...got out of bed at ${props.getUpTime}.`
    : todayViewConfig.messages.getUpTime;

  return (
    <Box flex align="center" justify="center">
      <Box fill flex align="center" justify="center">
        <Box>
          <Text weight="bold" size="large">
            Today, you...
          </Text>
        </Box>
        <Box>
          <Paragraph>{wakeTime}</Paragraph>
          <Paragraph>{getUpTime}</Paragraph>
          <Paragraph>{sleepTime}</Paragraph>
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = ({
  snuzeTimes: { sleepTime, wakeTime, getUpTime }
}) => {
  return { sleepTime, wakeTime, getUpTime };
};

export default connect(mapStateToProps)(TodayView);
