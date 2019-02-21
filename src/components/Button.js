import React from 'react';
import PropTypes from 'prop-types';
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

Button.propTypes = {
  text: PropTypes.string,
  handleClick: PropTypes.func
};

export default Button;
