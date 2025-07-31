import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { useAlert } from 'src/alert';
import { useApiMarketCalls } from 'src/api/marketApi';

export default function PuspaDayOffModal({ isOpen, onClose, dayOffData }) {
  const { handleSuccess, handleError } = useAlert();
  const { marketDayOffUpdateApi } = useApiMarketCalls();

  const [formData, setFormData] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  });

  // console.log('formData: ', formData);
  // console.log('dayOffData: ', dayOffData);

  useEffect(() => {
    if (dayOffData?.market_off_day) {
      // Populate form data with editData if in edit mode
      // console.log(dayOffData?.market_off_day)
      setFormData(dayOffData?.market_off_day);
    } else {
      // Reset form data when not editing
      setFormData({
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
      });
    }
  }, [dayOffData]);

  const handleStatusChange = async (event, newStatus) => {
    // console.log(formData)
    if (newStatus !== null) {
      setFormData(newStatus);
      // console.log(formData)
      await marketDayOffUpdateApi({
        id: dayOffData?.market_id,
        toggle: event,
        })
        .then((data) => {
          handleSuccess(data ? data?.message : 'Toggle successful');
          setFormData(data?.data)
          // console.log(formData)
        })
        .catch((err) => {
          handleError(err ? err?.message : 'Toggle Error');
        });
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
            borderBottom: '1px solid lightgray',
            p: 2, // Padding for the header
          }}
        >
          {/* Title of the modal */}
          <Typography variant="h6">{dayOffData?.name} Market Day Off</Typography>
          {/* Close button */}
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        {/* Modal content passed as prop */}
        <Box sx={{ p: 4 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
            <Typography variant="h6">Monday: &nbsp;&nbsp;&nbsp;</Typography>
            <ToggleButtonGroup
              value={formData?.monday ? 'active' : 'inactive'}
              color={formData?.monday ? 'success' : 'error'}
              exclusive
              onChange={() => handleStatusChange('monday')}
              aria-label="status"
            >
              <ToggleButton value="active" aria-label="active">
                <CheckIcon /> On
              </ToggleButton>
              <ToggleButton value="inactive" aria-label="inactive">
                <CloseIcon /> Off
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
            <Typography variant="h6">Tuesday: &nbsp;&nbsp;&nbsp;</Typography>
            <ToggleButtonGroup
              value={formData?.tuesday ? 'active' : 'inactive'}
              color={formData?.tuesday ? 'success' : 'error'}
              exclusive
              onChange={() => handleStatusChange('tuesday')}
              aria-label="status"
            >
              <ToggleButton value="active" aria-label="active">
                <CheckIcon /> On
              </ToggleButton>
              <ToggleButton value="inactive" aria-label="inactive">
                <CloseIcon /> Off
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
            <Typography variant="h6">Wednesday: &nbsp;&nbsp;&nbsp;</Typography>
            <ToggleButtonGroup
              value={formData?.wednesday ? 'active' : 'inactive'}
              color={formData?.wednesday ? 'success' : 'error'}
              exclusive
              onChange={() => handleStatusChange('wednesday')}
              aria-label="status"
            >
              <ToggleButton value="active" aria-label="active">
                <CheckIcon /> On
              </ToggleButton>
              <ToggleButton value="inactive" aria-label="inactive">
                <CloseIcon /> Off
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
            <Typography variant="h6">Thursday: &nbsp;&nbsp;&nbsp;</Typography>
            <ToggleButtonGroup
              value={formData?.thursday ? 'active' : 'inactive'}
              color={formData?.thursday ? 'success' : 'error'}
              exclusive
              onChange={() => handleStatusChange('thursday')}
              aria-label="status"
            >
              <ToggleButton value="active" aria-label="active">
                <CheckIcon /> On
              </ToggleButton>
              <ToggleButton value="inactive" aria-label="inactive">
                <CloseIcon /> Off
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
            <Typography variant="h6">Friday: &nbsp;&nbsp;&nbsp;</Typography>
            <ToggleButtonGroup
              value={formData?.friday ? 'active' : 'inactive'}
              color={formData?.friday ? 'success' : 'error'}
              exclusive
              onChange={() => handleStatusChange('friday')}
              aria-label="status"
            >
              <ToggleButton value="active" aria-label="active">
                <CheckIcon /> On
              </ToggleButton>
              <ToggleButton value="inactive" aria-label="inactive">
                <CloseIcon /> Off
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
            <Typography variant="h6">Saturday: &nbsp;&nbsp;&nbsp;</Typography>
            <ToggleButtonGroup
              value={formData?.saturday ? 'active' : 'inactive'}
              color={formData?.saturday ? 'success' : 'error'}
              exclusive
              onChange={() => handleStatusChange('saturday')}
              aria-label="status"
            >
              <ToggleButton value="active" aria-label="active">
                <CheckIcon /> On
              </ToggleButton>
              <ToggleButton value="inactive" aria-label="inactive">
                <CloseIcon /> Off
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
            <Typography variant="h6">Sunday: &nbsp;&nbsp;&nbsp;</Typography>
            <ToggleButtonGroup
              value={formData?.sunday ? 'active' : 'inactive'}
              color={formData?.sunday ? 'success' : 'error'}
              exclusive
              onChange={() => handleStatusChange('sunday')}
              aria-label="status"
            >
              <ToggleButton value="active" aria-label="active">
                <CheckIcon /> On
              </ToggleButton>
              <ToggleButton value="inactive" aria-label="inactive">
                <CloseIcon /> Off
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}

PuspaDayOffModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  dayOffData: PropTypes.any,
};
