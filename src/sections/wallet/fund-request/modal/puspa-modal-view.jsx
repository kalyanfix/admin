import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function PuspaModalView({ isOpen, onClose, viewData }) {
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
          <Typography variant="h6">View Photo</Typography>

          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ p: 2 }}>
          <img
            src={`${baseUrl}api/v1/misc/images?type=transaction&name=${viewData}`}
            alt={viewData}
            crossOrigin="anonymous"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/images/no-image.png';
            }}
            style={{ width: '100%', height: '60vh', maxHeight: '100vh', objectFit: 'contain' }}
          />

          <Stack direction="row" spacing={2} />
        </Box>
      </Box>
    </Modal>
  );
}

PuspaModalView.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  viewData: PropTypes.string,
};
