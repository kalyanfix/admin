import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import { capitalizeString } from 'src/utils/format-string';

export default function PuspaModalView({ isOpen, onClose, viewData }) {
  // console.log(viewData);
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          width: {
            xs: '90%', // Full width for extra small screens
            sm: 400,
            md: 500,
          }, // Example width for the modal
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '0px solid lightgray',
            p: 2, // Padding for the header
          }}
        >
          <Typography variant="h6">
            {viewData?.user_name ? capitalizeString(viewData?.user_name) : 'User'}&apos;s Details
          </Typography>

          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ p: 2 }}>
          <Grid xs={12} sm={4}>
            <Typography>
              Phone Number: {viewData?.mobile === '-' ? 'N/A' : viewData?.mobile}
            </Typography>
            {/* <Typography>
              UPI Id: {viewData?.upi_id === '-' ? 'N/A' : viewData?.upi_id}
            </Typography> */}
            <Typography>
              UPI Number: {viewData?.upi_number === '-' ? 'N/A' : viewData?.upi_number}
            </Typography>
            {/* <Typography>
              Branch Name: {viewData?.branch_name === '-' ? 'N/A' : viewData?.branch_name}
            </Typography>
            <Typography>
              Bank Name: {viewData?.bank_name === '-' ? 'N/A' : viewData?.bank_name}
            </Typography>
            <Typography>
              Address: {viewData?.address === '-' ? 'N/A' : viewData?.address}
            </Typography> */}
          </Grid>

          <Stack direction="row" spacing={2} />
        </Box>
      </Box>
    </Modal>
  );
}

PuspaModalView.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  viewData: PropTypes.object,
};
