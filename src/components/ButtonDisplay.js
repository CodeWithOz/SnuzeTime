import React, { Component } from 'react';
import Button from './Button';
import { Box, Paragraph } from 'grommet';

const btnDisplayConfig = {
  sleep: {
    text: '...going to bed',
    callbackName: 'saveSleepTime'
  },
  wake: {
    text: '...waking up',
    callbackName: 'saveWakeTime'
  },
  getUp: {
    text: '...getting up',
    callbackName: 'saveGetUpTime'
  }
};

const getButtons = propsObj => {
  const { hour } = propsObj;

  if (hour >= 18 || hour < 2) {
    // going to bed
    return {
      bigBtn: 'sleep',
      smallLeftBtn: 'wake',
      smallRightBtn: 'getUp'
    };
  } else if (hour >= 10 && hour < 18) {
    // getting up
    return {
      bigBtn: 'getUp',
      smallLeftBtn: 'wake',
      smallRightBtn: 'sleep'
    };
  } else {
    // waking up
    return {
      bigBtn: 'wake',
      smallLeftBtn: 'getUp',
      smallRightBtn: 'sleep'
    };
  }
};

class ButtonDisplay extends Component {
  render() {
    const { bigBtn, smallLeftBtn, smallRightBtn } = getButtons(this.props);

    return (
      <Box flex align="center" justify="center">
        <Box fill flex align="center" justify="center">
          <Paragraph textAlign="center">I am...</Paragraph>
          <Button
            primary
            style={{ height: '50px' }}
            text={btnDisplayConfig[bigBtn].text}
            onClick={this.props[btnDisplayConfig[bigBtn].callbackName]}
          />
          <Box direction="row">
            <Button
              text={btnDisplayConfig[smallLeftBtn].text}
              onClick={this.props[btnDisplayConfig[smallLeftBtn].callbackName]}
            />
            <Button
              text={btnDisplayConfig[smallRightBtn].text}
              onClick={this.props[btnDisplayConfig[smallRightBtn].callbackName]}
            />
          </Box>
        </Box>
      </Box>
    );
  }
}

export default ButtonDisplay;
