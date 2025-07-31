import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';

import { capitalizeString } from 'src/utils/format-string';

import { useAlert } from 'src/alert';
import { Textarea } from 'src/theme/textArea';
import { fetchAllUsers } from 'src/_mock/user_mng';
import { useApiNotificationCalls } from 'src/api/notificationApi';

export default function PuspaModalAddNotice({ isOpen, onClose, viewData }) {
  const { handleSuccess, handleError } = useAlert();
  const { notificationCreateApi } = useApiNotificationCalls();

  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    body: '',
    url: '',
    all_user: false,
    image: null,
    user_id: '',
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchAllUsers(); // Fetch users from the function
        // console.log('userData: ', userData);
        setUsers(userData); // Store the users in state
      } catch (err) {
        // console.log(err); // Store any error in state
      }
    };

    fetchData(); // API call when modal is closed

    if (isOpen) {
      setFormData({ title: '', body: '', url: '', image: null, all_user: false, user_id: '' });
      setImagePreview(null);
    }
  }, [isOpen, viewData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, body, url, image, all_user, user_id } = formData;

    const data = new FormData();
    data.append('title', title);
    data.append('body', body);
    data.append('url', url);
    data.append('all_user', all_user);
    data.append('user_id', user_id);
    if (image) {
      data.append('image', image);
    }

    try {
      await notificationCreateApi(data);
      handleSuccess('Send Notification successfully');
      onClose(); // Close the modal on success
    } catch (err) {
      handleError(err.response.data.message || 'Error occurred');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const validTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/gif'];

    if (file && validTypes.includes(file.type)) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    } else {
      handleError('Invalid file type. Please select an image file (png, jpg, jpeg, webp).');
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, all_user: e.target.checked });
  };

  return (
    <Modal
      scroll="body"
      sx={{ overflow: 'scroll' }}
      disableScrollLock
      open={isOpen}
      onClose={onClose}
    >
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
          <Typography variant="h6">Add Notification</Typography>
          {/* Close button */}
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        {/* Modal content passed as prop */}
        <Box sx={{ p: 2 }}>
          <form onSubmit={handleSubmit}>
            {imagePreview && (
              <Box
                sx={{
                  my: 2,
                  textAlign: 'center',
                }}
              >
                <img
                  src={imagePreview}
                  alt="preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: 200,
                  }}
                />
              </Box>
            )}

            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{
                my: 2,
              }}
            >
              Upload Image
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.webp,.gif"
                hidden
                onChange={handleImageChange}
              />
            </Button>

            <Stack direction="row" spacing={2} />

            <FormControlLabel
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '100%' },
                alignContent: 'center',
                mb: { xs: 2, sm: 2 },
              }}
              control={<Checkbox checked={formData.all_user} onChange={handleCheckboxChange} />}
              label="All User"
            />

            <Stack direction="row" spacing={4} />

            <Autocomplete
              multiple
              limitTags={2}
              id="multiple-limit-tags"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '100%' },
                mb: { xs: 2, sm: 0 },
              }}
              onChange={(event, newValue) => {
                const userIds = newValue.map((user) => user.user_id).join(',');
                setFormData({ ...formData, user_id: userIds });
              }}
              options={users}
              getOptionLabel={(option) => capitalizeString(option.name)}
              disabled={formData.all_user}
              renderInput={(params) => (
                <TextField {...params} label="User List" placeholder="User List" />
              )}
            />

            <TextField
              fullWidth
              name="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              label="Title"
              sx={{
                my: 2,
              }}
            />
            <Stack direction="row" spacing={2} />

            <Textarea
              minRows={3}
              maxRows={3}
              label="App Link"
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              placeholder="Enter Notice Body"
            />

            <Stack direction="row" spacing={2} />

            <TextField
              fullWidth
              name="Url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              label="Url"
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

PuspaModalAddNotice.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  viewData: PropTypes.object,
};
