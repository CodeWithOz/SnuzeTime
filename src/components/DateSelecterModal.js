import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Anchor, Box, Layer } from 'grommet';
import { Close } from 'grommet-icons';

export class DateSelecterModal extends Component {
  getBackground(currentHour) {
    return currentHour >= 7 && currentHour < 19 ? 'light-1' : 'dark-1';
  }

  render() {
    const { currentHour, hide } = this.props;

    return (
      <Layer responsive={false} onEsc={hide} onClickOutside={hide}>
        <Box fill background={this.getBackground(currentHour)}>
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

const mapStateToProps = ({ currentTimes: { hour } }) => {
  return { currentHour: hour };
};

export default connect(mapStateToProps)(DateSelecterModal);
