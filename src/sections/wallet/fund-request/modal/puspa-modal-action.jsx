import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';

// import { capitalizeString } from 'src/utils/format-string';

import { useAlert } from 'src/alert';
import { useApiTransactionCalls } from 'src/api/transactionApi';

export default function PuspaModalAction({ isOpen, onClose, actionData }) {
  const { handleSuccess, handleError } = useAlert();
  const { transactionSwitchApi } = useApiTransactionCalls();

  const [formData, setFormData] = useState({
    amount: '',
    remarks: '',
  });

  useEffect(() => {
    if (isOpen) {
      // console.log(actionData.amount);
      setFormData({ amount: `${actionData.amount}`, remarks: '' });
    }
  }, [isOpen, actionData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { amount, remarks } = formData;

    try {
      await transactionSwitchApi({
        id: actionData.trxId,
        amount: String(amount),
        note: remarks,
        status: actionData.status === 'accept' ? 'completed' : 'cancelled',
      });
      handleSuccess('Fund withdrawl successfully');
      onClose(); // Close the modal on success
    } catch (err) {
      handleError(err.response.data.message || 'Error occurred');
    }
  };

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
          {/* Title of the modal */}
          <Typography variant="h6">
            {actionData.status === 'accept' ? 'Approve Request' : 'Reject Request'}
          </Typography>
          {/* Close button */}
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        {/* Modal content passed as prop */}
        <Box sx={{ p: 2 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="Amount"
              disabled={actionData.status !== 'accept'}
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              label="Amount"
              sx={{
                my: 2,
              }}
            />

            <Stack direction="row" spacing={2} />

            <TextField
              fullWidth
              name="Remarks"
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              label="Remarks"
              sx={{
                my: 2,
              }}
            />

            <Stack direction="row" spacing={2} />
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loadingPosition="center"
              sx={{
                my: 2,
              }}
              color="inherit"
              onClick={handleSubmit}
            >
              Submit
            </LoadingButton>
          </form>
        </Box>
      </Box>
    </Modal>
  );
}

PuspaModalAction.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  actionData: PropTypes.any,
};
