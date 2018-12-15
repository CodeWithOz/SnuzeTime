import React from 'react';
import Button from './Button';
import TestRenderer from 'react-test-renderer';

test('clicking invokes the supplied click handler', () => {
  const mockClickHandler = jest.fn();
  const buttonInstance = TestRenderer.create(
    <Button text="Text" onClick={mockClickHandler} />
  ).root;

  // trigger click event on the button
  buttonInstance.findByType('button').props.onClick();
  expect(mockClickHandler).toHaveBeenCalledTimes(1);
});
