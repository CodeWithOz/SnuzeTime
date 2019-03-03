import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Anchor, Box, Layer } from 'grommet';
import { Close } from 'grommet-icons';

class DateSelecterModal extends Component {
  getBackground() {}

  render() {
    const { hide } = this.props;

    return (
      <Layer responsive={false} onEsc={hide} onClickOutside={hide}>
        <Box fill>
          <Box
            width="medium"
            direction="row"
            align="center"
            justify="end"
            elevation="xsmall"
          >
            <Anchor icon={<Close />} onClick={hide} />
          </Box>
        </Box>
      </Layer>
    );
  }
}

DateSelecterModal.propTypes = {
  hide: PropTypes.func
};

export default DateSelecterModal;
