import React from 'react';

const TodayView = props => {
  const sleepTime = props.sleepTime || `...haven't gone to bed.`;
  const wakeTime = props.wakeTime || `...haven't woken up.`;
  const getUpTime = props.getUpTime || `...haven't gotten out of bed.`;

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
