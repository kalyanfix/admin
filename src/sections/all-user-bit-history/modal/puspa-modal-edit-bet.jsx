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
import Autocomplete from '@mui/material/Autocomplete';

import { useAlert } from 'src/alert';
import { useApiBetCalls } from 'src/api/betApi';
import { fullList, fullDigit } from 'src/_mock/market';

export default function PuspaModalEditBet({ isOpen, onClose, betData }) {
  const { handleSuccess, handleError } = useAlert();
  const { updateBetApi } = useApiBetCalls();

  const [formData, setFormData] = useState({
    id: betData?.id || '',
    open_panna: betData?.open_panna || '',
    open_digit: betData?.open_digit || '',
    close_digit: betData?.close_digit || '',
    close_panna: betData?.close_panna || '',
  });

  const [openPannaValue, setOpenPannaValue] = useState(null);
  const [openPannaInputValue, setOpenPannaInputValue] = useState('');
  const [closePannaValue, setClosePannaValue] = useState(null);
  const [closePannaInputValue, setClosePannaInputValue] = useState('');

  const [openDigitValue, setOpenDigitValue] = useState(null);
  const [openDigitInputValue, setOpenDigitInputValue] = useState('');
  const [closeDigitValue, setCloseDigitValue] = useState(null);
  const [closeDigitInputValue, setCloseDigitInputValue] = useState('');

  useEffect(() => {
    setFormData({
      id: betData?.id || '',
      open_panna: betData?.open_panna || '',
      open_digit: betData?.open_digit || '',
      close_digit: betData?.close_digit || '',
      close_panna: betData?.close_panna || '',
    });

    setOpenPannaValue(fullList.find((item) => item.panna === betData?.open_panna) || null);
    setClosePannaValue(fullList.find((item) => item.panna === betData?.close_panna) || null);
    setOpenDigitValue(betData?.open_digit || '');
    setCloseDigitValue(betData?.close_digit || '');
  }, [betData]);

  const cleanFormData = (data) =>
    Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== '-'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedFormData = cleanFormData(formData);

    try {
      await updateBetApi({ id: betData?.id, ...cleanedFormData });
      handleSuccess('Fund added successfully');
      onClose();
    } catch (err) {
      handleError(err.response?.data?.message || 'Error occurred');
    }
  };

  const renderAutocomplete = (name, label, options, value, inputValue, setValue, setInputValue, getOptionLabel, keyField) => (
    formData[name] !== '-' && (
      <Autocomplete
        value={value}
        inputValue={inputValue}
        onChange={(event, newValue) => {
          setValue(newValue);
          setFormData((prevData) => ({
            ...prevData,
            [name]: newValue ? newValue[keyField] : '',
          }));
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        freeSolo
        sx={{ my: 2 }}
        fullWidth
        options={options}
        getOptionLabel={getOptionLabel}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...props}
            key={option[keyField]}
          >
            {option[keyField]}
          </Box>
        )}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    )
  );

  const renderDigitAutocomplete = (name, label, options, value, inputValue, setValue, setInputValue) => (
    formData[name] !== '-' && (
      <Autocomplete
        value={value}
        inputValue={inputValue}
        onChange={(event, newValue) => {
          setValue(newValue);
          setFormData((prevData) => ({
            ...prevData,
            [name]: newValue || '',
          }));
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        freeSolo
        sx={{ my: 2 }}
        fullWidth
        options={options}
        getOptionLabel={(option) => option}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...props}
            key={option}
          >
            {option}
          </Box>
        )}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    )
  );

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
          width: { xs: '90%', sm: 400, md: 500 },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '0px solid lightgray', p: 2 }}>
          <Typography variant="h6">Edit Bet ({formData.id})</Typography>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ p: 2 }}>
          <form onSubmit={handleSubmit}>
            {renderAutocomplete('open_panna', 'Open Panna', fullList, openPannaValue, openPannaInputValue, setOpenPannaValue, setOpenPannaInputValue, (option) => option.panna, 'panna')}
            <Stack direction="row" spacing={2} />
            {renderDigitAutocomplete('open_digit', 'Open Digit', fullDigit, openDigitValue, openDigitInputValue, setOpenDigitValue, setOpenDigitInputValue)}
            <Stack direction="row" spacing={2} />
            {renderDigitAutocomplete('close_digit', 'Close Digit', fullDigit, closeDigitValue, closeDigitInputValue, setCloseDigitValue, setCloseDigitInputValue)}
            <Stack direction="row" spacing={2} />
            {renderAutocomplete('close_panna', 'Close Panna', fullList, closePannaValue, closePannaInputValue, setClosePannaValue, setClosePannaInputValue, (option) => option.panna, 'panna')}
            <Stack direction="row" spacing={2} />
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loadingPosition="center"
              sx={{ my: 2 }}
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

PuspaModalEditBet.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  betData: PropTypes.shape({
    id: PropTypes.string,
    open_panna: PropTypes.string,
    open_digit: PropTypes.string,
    close_digit: PropTypes.string,
    close_panna: PropTypes.string,
  }),
};
