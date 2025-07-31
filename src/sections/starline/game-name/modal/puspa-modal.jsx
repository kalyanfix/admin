import dayjs from 'dayjs';
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
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { addHour, conTime } from 'src/utils/format-time';

import { useAlert } from 'src/alert';
import { useApiMarketCalls } from 'src/api/marketApi';

export default function PuspaModal({ isOpen, onClose, title, isEditMode, editData }) {
  const { handleSuccess, handleError } = useAlert();
  const { marketEditApi, marketCreateApi } = useApiMarketCalls();

  const [formData, setFormData] = useState({
    name: '',
    name_hindi: '',
    open_time: '',
    close_time: '',
  });

  useEffect(() => {
    if (isEditMode && editData) {
      // Populate form data with editData if in edit mode
      setFormData(editData);
    } else {
      // Reset form data when not editing
      setFormData({
        name: '',
        name_hindi: '',
        open_time: '',
        close_time: '',
      });
    }
  }, [isEditMode, editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, name_hindi, open_time } = formData;

    // console.log(open_time);

    try {
      if (isEditMode) {
        await marketEditApi({
          id: editData.market_id,
          name,
          name_hindi,
          open_time: conTime(open_time),
          close_time: addHour(conTime(open_time)),
        });
        handleSuccess('Market updated successfully');
      } else {
        await marketCreateApi({
          name,
          name_hindi,
          open_time: conTime(open_time),
          close_time: addHour(conTime(open_time)),
          tag: 'starline',
        });
        handleSuccess('Market created successfully');
        setFormData({
          name: '',
          name_hindi: '',
          open_time: '',
          close_time: '',
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
                value={formData.name_hindi}
                onChange={(e) => setFormData({ ...formData, name_hindi: e.target.value })}
                label="Hindi Name"
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  sx={{
                    width: '100%',
                  }}
                  components={['TimePicker']}
                >
                  <TimePicker
                    label="Open Time"
                    views={['hours']}
                    sx={{ width: '100%' }}
                    value={dayjs(`1970-01-01T${formData.open_time}`)}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        open_time: e.$d.toLocaleTimeString(),
                      });
                    }}
                    viewRenderers={{
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock,
                      seconds: renderTimeViewClock,
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
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
