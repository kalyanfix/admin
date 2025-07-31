import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';

import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAlert } from 'src/alert';
import { useApiAuthCalls } from 'src/api/authApi';

const INITIAL_COUNT = 120;

export default function PuspaModalOTP({ isOpen, onClose, upi, name }) {
  const { handleSuccess, handleError } = useAlert();
  const { otpVerifyApi } = useApiAuthCalls();

  const [otp, setOtp] = useState('');
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isCounting) {
      intervalId = setInterval(() => {
        if (secondsRemaining > 0) {
          setSecondsRemaining((prevSeconds) => prevSeconds - 1);
        } else {
          clearInterval(intervalId);
          setIsCounting(false);
        }
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isCounting, secondsRemaining]);

  // const handleResendClick = async (e) => {
  //   e.preventDefault();
  //   setSecondsRemaining(INITIAL_COUNT);
  //   setIsCounting(true);
  //   await otpResendApi({ mobile: '9564867424' }) // Ensure the mobile number or data needed is passed correctly.
  //     .then((data) => {
  //       // console.log(data);
  //       handleSuccess('OTP resend successful!');
  //       setOtp('');
  //     })
  //     .catch((err) => {
  //       // console.log(err.response.data.message);
  //       handleError(err.response.data.message);
  //     });
  // };

  const handleVerifyClick = async (e) => {
    e.preventDefault();
    // console.log(otp);
    await otpVerifyApi({ otp, merchant_upi: upi, merchant_name: name })
      .then((data) => {
        // console.log(data);
        handleSuccess('Verification successful!');
        setOtp('');
        onClose(); // Optionally close the modal on successful verification.
      })
      .catch((err) => {
        // console.log(err.response.data.message);
        handleError(err.response.data.message);
      });
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
            xs: '90%',
            sm: 400,
            md: 500,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '0px solid lightgray',
            p: 2,
          }}
        >
          <Typography variant="h6">Validate OTP</Typography>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ p: 2 }}>
          <form onSubmit={handleVerifyClick}>
            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 3 }}>
              <MuiOtpInput value={otp} onChange={setOtp} length={6} type="number" />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 3 }}
            />
              {/* <div style={{ padding: 20 }}>
                {twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}
              </div>
              <Link
                component="button"
                onClick={handleResendClick}
                disabled={isCounting}
                style={{ cursor: 'pointer' }}
                variant="subtitle2"
                underline="hover"
              >
                Resend OTP
              </Link> */}
            <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit">
              Verify
            </LoadingButton>
          </form>
        </Box>
      </Box>
    </Modal>
  );
}

PuspaModalOTP.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  upi: PropTypes.string,
  name: PropTypes.string,
};

// const twoDigits = (num) => String(num).padStart(2, '0');
