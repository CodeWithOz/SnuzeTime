import React from 'react';
import { shallow, mount } from 'enzyme';
import Button from './Button';

test('Clicking invokes the supplied click handler', () => {
  const mockClickHandler = jest.fn();
  const wrapper = shallow(
    <Button text="Text" handleClick={mockClickHandler} />
  );

  expect(mockClickHandler).toHaveBeenCalledTimes(0);

  // trigger click event on the button
  wrapper.simulate('click');
  expect(mockClickHandler).toHaveBeenCalledTimes(1);
});

test('The supplied text is displayed', () => {
  const text = 'test';
  const wrapper = mount(<Button text={text} />);
  expect(wrapper.text()).toContain(text);
});
