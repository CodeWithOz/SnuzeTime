import React from 'react';
import { render } from 'enzyme';
import { Clock } from './Clock';

test('Clock displays the supplied time', () => {
  const time = '09:09:23 PM';
  const wrapper = render(<Clock currentTime={time} />);
  expect(wrapper.text()).toContain(time);
});
