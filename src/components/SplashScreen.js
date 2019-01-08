import React from 'react';
import { Box, Paragraph } from 'grommet';
import { RotateSpinLoader } from 'react-css-loaders';

const splashScreenConfig = {
  background: 'dark-2',
  spinnerColor: '#F2F2F2' // grommet 'light-2'
};

const SplashScreen = ({ appName }) => {
  return (
    <Box fill background={splashScreenConfig.background}>
      <Paragraph textAlign="center">{appName}</Paragraph>
      <RotateSpinLoader color={splashScreenConfig.spinnerColor} />
    </Box>
  );
};

export default SplashScreen;
