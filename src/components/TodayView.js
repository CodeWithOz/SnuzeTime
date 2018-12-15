import React from 'react';

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
    <section>
      Today, you...
      <p>{wakeTime}</p>
      <p>{getUpTime}</p>
      <p>{sleepTime}</p>
    </section>
  );
};

export default TodayView;
