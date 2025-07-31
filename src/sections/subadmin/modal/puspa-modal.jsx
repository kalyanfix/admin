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

import { useAlert } from 'src/alert';
import { useApiAdminCalls } from 'src/api/adminApi';

export default function PuspaModal({ isOpen, onClose, title, isEditMode, editData }) {
  const { handleSuccess, handleError } = useAlert();
  const { adminEditApi, adminCreateApi } = useApiAdminCalls();

  const [formData, setFormData] = useState({
    name: '',
    user_name: '',
    password: '',
    mobile: '',
  });

  useEffect(() => {
    if (isEditMode && editData) {
      // Populate form data with editData if in edit mode
      setFormData(editData);
    } else {
      // Reset form data when not editing
      setFormData({
        name: '',
        user_name: '',
        password: '',
        mobile: '',
      });
    }
  }, [isEditMode, editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, user_name, password, mobile } = formData;

    try {
      if (isEditMode) {
        await adminEditApi({
          id: editData.market_id,
          user_name,
          name,
          password,
          mobile,
          type: 'sub_admin',
        });
        handleSuccess('Market updated successfully');
      } else {
        await adminCreateApi({
          user_name,
          name,
          password,
          mobile,
          type: 'sub_admin',
        });
        handleSuccess('Market created successfully');
        setFormData({
          name: '',
          user_name: '',
          password: '',
          mobile: '',
        });
      }

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
            sm: '70%', // 70% width for small screens
            md: '50%', // 50% width for medium screens
            lg: '40%', // 40% width for large screens
          }, // Responsive width for the modal
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid lightgray',
            p: 2, // Padding for the header
          }}
        >
          {/* Title of the modal */}
          <Typography variant="h6">{title}</Typography>
          {/* Close button */}
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        {/* Modal content passed as prop */}
        <Box sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={3}
              direction={{ xs: 'column', sm: 'row' }} // Stack items vertically on small screens
              alignItems="center"
              justifyContent="space-between"
              sx={{
                borderRadius: 2,
              }}
            >
              <TextField
                name="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                label="Name"
                fullWidth
              />

              <TextField
                name="text"
                value={formData.user_name}
                onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                label="User Name"
                fullWidth
              />
            </Stack>

            <Stack
              spacing={3}
              direction={{ xs: 'column', sm: 'row' }} // Stack items vertically on small screens
              alignItems="center"
              justifyContent="space-between"
              sx={{
                borderRadius: 2,
                mt: 3, // Add margin-top for spacing
              }}
            >
              <TextField
                name="text"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                label="Password"
                fullWidth
              />

              <TextField
                name="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                label="Mobile"
                fullWidth
              />
            </Stack>

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

PuspaModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  isEditMode: PropTypes.bool,
  editData: PropTypes.object,
};
