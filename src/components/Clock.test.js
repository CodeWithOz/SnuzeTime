import React from 'react';
import Clock from './Clock';
import renderer from 'react-test-renderer';

test('Clock component exists', () => {
  const clock = renderer.create(<Clock currentTime={'06:14 AM'} />);

  // render the component
  const tree = clock.toJSON();
  expect(tree).toMatchSnapshot();
});
