import React from 'react';
import TodayView from './TodayView';
import TestRenderer from 'react-test-renderer';

describe('TodayView', () => {
  test('displays default text when empty strings are supplied', () => {
    const defaultTexts = {
      sleep: `...haven't gone to bed.`,
      wake: `...haven't woken up.`,
      getUp: `...haven't gotten out of bed.`
    };

    const todayViewHTML = TestRenderer.create(
      <TodayView sleepTime="" wakeTime="" getUpTime="" />
    ).toJSON();

    // convert object representation to string for easier matching
    const todayViewAsString = JSON.stringify(todayViewHTML.children);

    expect(todayViewAsString).toContain(defaultTexts.sleep);
    expect(todayViewAsString).toContain(defaultTexts.wake);
    expect(todayViewAsString).toContain(defaultTexts.getUp);
  });

  test('displays supplied text instead of default text', () => {
    const suppliedTexts = {
      sleep: `11:45 PM`,
      wake: `05:45 AM`,
      getUp: `5:50 AM`
    };

    const todayViewHTML = TestRenderer.create(
      <TodayView
        sleepTime={suppliedTexts.sleep}
        wakeTime={suppliedTexts.wake}
        getUpTime={suppliedTexts.getUp}
      />
    ).toJSON();

    // convert object representation to string for easier matching
    const todayViewAsString = JSON.stringify(todayViewHTML.children);

    expect(todayViewAsString).toContain(suppliedTexts.sleep);
    expect(todayViewAsString).toContain(suppliedTexts.wake);
    expect(todayViewAsString).toContain(suppliedTexts.getUp);
  });
});
