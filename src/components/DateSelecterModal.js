import React from 'react';
import { Anchor, Box, Layer } from 'grommet';
import { Close } from 'grommet-icons';

const DateSelecterModal = ({ hide }) => {
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
          <Anchor icon={<Close />} />
        </Box>
      </Box>
    </Layer>
  );
};

export default DateSelecterModal;
