import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render } from 'enzyme';
import { RotateSpinLoader } from 'react-css-loaders';
import SplashScreen from './SplashScreen';

describe('SplashScreen', () => {
  test('renders the value of its appName prop', () => {
    const appName = 'test';
    const wrapper = render(<SplashScreen appName={appName} />);
    expect(wrapper.text()).toContain(appName);
  });

  test('renders a loading spinner', () => {
    const splashScreen = TestRenderer.create(<SplashScreen />).root;
    expect(splashScreen.findByType(RotateSpinLoader)).toBeDefined();
  });
});
