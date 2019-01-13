import React from 'react';
import { Button as GrommetButton } from 'grommet';

const Button = props => {
  return (
    <GrommetButton
      label={props.text}
      onClick={props.handleClick}
      margin="xsmall"
      {...props}
    />
  );
};

export default Button;
