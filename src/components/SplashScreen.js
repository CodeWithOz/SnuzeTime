import React from 'react';
import { Box, Heading } from 'grommet';
import { RotateSpinLoader } from 'react-css-loaders';

const splashScreenConfig = {
  background: 'dark-2',
  spinnerColor: '#F2F2F2' // grommet 'light-2'
};

const SplashScreen = ({ appName }) => {
  return (
    <Box fill background={splashScreenConfig.background}>
      <Box flex justify="center" alignSelf="center">
        <Heading level="1" margin="none">
          {appName}
        </Heading>
        <RotateSpinLoader size={3} color={splashScreenConfig.spinnerColor} />
      </Box>
    </Box>
  );
};

export default SplashScreen;
