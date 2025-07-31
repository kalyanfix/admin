import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAlert } from 'src/alert';
import { Textarea } from 'src/theme/textArea';
import { useApiNoticeCalls } from 'src/api/noticeApi';

export default function PuspaModalAddNotice({ isOpen, onClose, viewData }) {
  const { handleSuccess, handleError } = useAlert();
  const { noticeCreateApi } = useApiNoticeCalls();

  const [formData, setFormData] = useState({
    title: '',
    body: '',
    url: '',
    button: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({ title: '', body: '', url: '', image: null, button: '' });
      setImagePreview(null);
    }
  }, [isOpen, viewData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, body, url, image, button } = formData;

    const data = new FormData();
    data.append('title', title);
    data.append('body', body);
    data.append('url', url);
    data.append('button', button);
    if (image) {
      data.append('image', image);
    }

    try {
      await noticeCreateApi(data);
      handleSuccess('Notice created successfully');
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
      handleError('Invalid file type. Please select an image file (png, jpg, jpeg, webp, gif).');
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
            borderBottom: '0px solid lightgray',
            p: 2, // Padding for the header
          }}
        >
          {/* Title of the modal */}
          <Typography variant="h6">Add Notice</Typography>
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
                    maxHeight: 100,
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
              sx={{
                my: 2,
              }}
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

            <TextField
              fullWidth
              name="Button Text"
              value={formData.button}
              onChange={(e) => setFormData({ ...formData, button: e.target.value })}
              label="Button Text"
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
