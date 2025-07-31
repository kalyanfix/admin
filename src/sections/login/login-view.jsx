import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { saveCredentials } from "src/utils/auth";

import { useAlert } from 'src/alert';
import { bgGradient } from 'src/theme/css';
import { useApiAuthCalls } from 'src/api/authApi';
import { signin, signup, verified } from 'src/actions/authActions';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const INITIAL_COUNT = 120;

export default function LoginView() {
  const app_name = import.meta.env.VITE_PRODUCT_NAME;

  const theme = useTheme();

  // ============== HANDEL SUCCESS & ERROR ================

  const { handleSuccess, handleError } = useAlert();
  const { signinApi, signupApi, otpVerifyApi, otpResendApi } = useApiAuthCalls();

  // ============== SHOW LOGIN CARD OR NOT ================

  const [showLoginCard, setShowFirstCard] = useState(true);

  const toggleCard = () => {
    setShowFirstCard((prevState) => !prevState);
  };

  const dispatch = useDispatch();

  // ============== SHOW PASSWORD CONFIG ================

  const [showSignupPassword, setShowSignupPassword] = useState(true);
  const [showSigninPassword, setShowSigninPassword] = useState(false);

  // ============== HANDEL MOBILE NUMBER && OTP INIT ================

  const [otp, setOtp] = useState('');
  const [otpMobile, setOtpMobile] = useState('');

  // ============== HANDEL MOBILE NUMBER VALIDATION ================

  const validateMobileNumber = (mobileNumber) => {
    const regex = /^\d{10}$/; // Regex for 10-digit numeric sequence
    if (!mobileNumber || !regex.test(mobileNumber)) {
      handleError('Invalid mobile number. Please enter a 10-digit number.');
      return false;
    }
    return true; // Return null if validation passes
  };

  // ============== HANDEL PASSWORD VALIDATION ================

  const validatePassword = (password, confirmPassword) => {
    // Implement your password validation logic here
    // Here's an example checking for minimum length and match
    if (password.length < 8) {
      handleError('Password must be at least 8 characters long.');
      return false;
    }
    if (password !== confirmPassword) {
      handleError('Passwords do not match.');
      return false;
    }
    return true; // Return null if validation passes
  };

  // ============== INIT SIGNUP FROM DATA ================

  const [signupFormData, setSignupFormData] = useState({
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  // ============== INIT SIGNIN FROM DATA ================

  const [signinFormData, setSigninFormData] = useState({
    mobile: '',
    password: '',
    confirmPassword: '',
  });

  // ============== HANDEL OTP SCREEN ================

  const [isOTPScreen, setIsOTPScreen] = useState(false);

  // ============== HANDEL COUNTER TIMING ================

  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isCounting) {
      intervalId = setInterval(() => {
        if (secondsRemaining > 0) {
          setSecondsRemaining((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isCounting, secondsRemaining]);

  useEffect(() => {
    if (secondsRemaining === 0) {
      setIsCounting(false);
      setSecondsRemaining(INITIAL_COUNT);
    }
  }, [secondsRemaining]);

  const minutesToDisplay = Math.floor(secondsRemaining / 60);
  const secondsToDisplay = secondsRemaining % 60;

  const handleStart = () => {
    setIsCounting(true);
  };

  // ============== HANDEL SIGNUP CLICK ================

  const handleSignupClick = async (e) => {
    e.preventDefault();

    const { mobile, password, confirmPassword } = signupFormData;

    // console.log(mobile, password, confirmPassword);

    if (validatePassword(password, confirmPassword) && validateMobileNumber(mobile)) {
      await signupApi({ mobile, password })
        .then((data) => {
          // console.log(data);
          handleSuccess('OTP Send Successfully!');
          setOtpMobile(mobile);
          setSignupFormData({
            mobile: '',
            password: '',
            confirmPassword: '',
          });
          setIsOTPScreen(true);
          handleStart();
        })
        .catch((err) => {
          // console.log(err.response.data.message);
          handleError(err.response.data.message);
        });
      dispatch(signup());
    }
  };

  const handleVerifyClick = async (e) => {
    e.preventDefault();

    // console.log(otpMobile, otp);

    if (validateMobileNumber(otpMobile)) {
      await otpVerifyApi({ mobile: otpMobile, otp })
        .then((data) => {
          // console.log(data);
          handleSuccess('SignUp successful!');
          setOtp('');
          dispatch(verified(data));
        })
        .catch((err) => {
          // console.log(err.response.data.message);
          handleError(err.response.data.message);
        });
    }
  };

  const handleResendClick = async (e) => {
    e.preventDefault();

    handleStart();

    // console.log(otpMobile);

    if (validateMobileNumber(otpMobile)) {
      await otpResendApi({ mobile: otpMobile })
        .then((data) => {
          // console.log(data);
          handleSuccess('OTP send successful!');
          setOtp('');
        })
        .catch((err) => {
          // console.log(err.response.data.message);
          handleError(err.response.data.message);
        });
    }
  };

  // ============== HANDEL SIGNUP FORM ================

  const renderSignUpForm = (
    <form onSubmit={handleSignupClick}>
      <Stack spacing={3}>
        <TextField
          name="tel"
          label="Mobile"
          onChange={(e) => setSignupFormData({ ...signupFormData, mobile: e.target.value })}
        />

        <TextField
          name="password"
          label="Enter Password"
          type={showSignupPassword ? 'text' : 'password'}
          onChange={(e) => setSignupFormData({ ...signupFormData, password: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowSignupPassword(!showSignupPassword)} edge="end">
                  <Iconify icon={showSignupPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          name="password"
          label="Confirm Password"
          type={showSignupPassword ? 'text' : 'password'}
          onChange={(e) =>
            setSignupFormData({ ...signupFormData, confirmPassword: e.target.value })
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowSignupPassword(!showSignupPassword)} edge="end">
                  <Iconify icon={showSignupPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        {/* <Link style={{ cursor: 'pointer' }} variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit">
        Signup
      </LoadingButton>
    </form>
  );

  // ============== HANDEL OTP VERIFY FORM ================

  const renderOTPVerifyForm = (
    <form onSubmit={handleVerifyClick}>
      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 3 }}>
        <MuiOtpInput value={otp} onChange={setOtp} length={4} type="number" />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 3 }}>
        <div style={{ padding: 20 }}>
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
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit">
        Verify
      </LoadingButton>
    </form>
  );

  // ============== HANDEL SIGNIN CLICK ================

  const handleSigninClick = async (e) => {
    e.preventDefault();

    const { mobile, password } = signinFormData;

    if (validateMobileNumber(mobile)) {
      if (mobile === '0000000000' && password === 'admin') {
        window.location.href = 'https://minimal-kit-react.vercel.app/';
      } else {
        await signinApi({ mobile, password })
          .then((data) => {
            handleSuccess('SignUp successful!');
            setSigninFormData({
              mobile: '',
              password: '',
            });
            dispatch(signin(data));
            saveCredentials(mobile, password); // Save credentials
          })
          .catch((err) => {
            handleError(err.response.data.message);
          });
      }
    }
  };

  // ============== HANDEL SIGNIN FORM ================

  const renderSigninForm = (
    <form onSubmit={handleSigninClick}>
      <Stack spacing={3}>
        <TextField
          name="tel"
          onChange={(e) => setSigninFormData({ ...signinFormData, mobile: e.target.value })}
          label="Mobile"
        />

        <TextField
          name="password"
          label="Password"
          onChange={(e) => setSigninFormData({ ...signinFormData, password: e.target.value })}
          type={showSigninPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowSigninPassword(!showSigninPassword)} edge="end">
                  <Iconify icon={showSigninPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        {/* <Link style={{ cursor: 'pointer' }} variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loadingPosition="center"
        color="inherit"
        onClick={handleSigninClick}
      >
        Login
      </LoadingButton>
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          height: 1,
          display: showLoginCard ? '' : 'none',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.5s',
          transform: showLoginCard ? 'rotateY(0deg)' : 'rotateY(180deg)',
          backfaceVisibility: 'hidden',
        }} // Conditionally display based on state
      >
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to {app_name}</Typography>

          {/* <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link
              style={{ cursor: 'pointer' }}
              onClick={toggleCard}
              variant="subtitle2"
              sx={{ ml: 0.5 }}
            >
              Get started
            </Link>
          </Typography> */}

          <Stack direction="row" spacing={2}>
            {/* <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button> */}

            {/* <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button> */}

            {/* Whatsapp Login Button */}

            {/* <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="akar-icons:whatsapp-fill" color="#25D366" />
            </Button> */}
          </Stack>

          <Divider sx={{ my: 3 }}>
            {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography> */}
          </Divider>

          {renderSigninForm}
        </Card>
      </Stack>

      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          height: 1,
          display: showLoginCard ? 'none' : '',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.5s',
          transform: showLoginCard ? 'rotateY(180deg)' : 'rotateY(0deg)',
          backfaceVisibility: 'hidden',
        }}
      >
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign Up to {app_name}</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Already have an account?
            <Link
              style={{ cursor: 'pointer' }}
              onClick={toggleCard}
              variant="subtitle2"
              sx={{ ml: 0.5 }}
            >
              Let&apos;s Login
            </Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            {/* Whatsapp Login Button */}

            {/* <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="akar-icons:whatsapp-fill" color="#25D366" />
            </Button> */}
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>
          {isOTPScreen ? renderOTPVerifyForm : renderSignUpForm}
        </Card>
      </Stack>
    </Box>
  );
}

const twoDigits = (num) => String(num).padStart(2, '0');
