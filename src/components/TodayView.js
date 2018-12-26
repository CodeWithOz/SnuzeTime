import React from 'react';
import { Box, Paragraph, Text } from 'grommet';

const TodayView = props => {
  const sleepTime = props.sleepTime
    ? `...slept at ${props.sleepTime}.`
    : `...haven't gone to bed.`;
  const wakeTime = props.wakeTime
    ? `...woke up at ${props.wakeTime}.`
    : `...haven't woken up.`;
  const getUpTime = props.getUpTime
    ? `...got out of bed at ${props.getUpTime}.`
    : `...haven't gotten out of bed.`;

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

export default TodayView;
