import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import CheckIcon from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import ToggleButton from '@mui/material/ToggleButton';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { conTime } from 'src/utils/format-time';

import { useAlert } from 'src/alert';
import { Textarea } from 'src/theme/textArea';
import { useApiAuthCalls } from 'src/api/authApi';
import { useApiSettingsCalls } from 'src/api/settingsApi';
import { settingsApi, settingsResultApi } from 'src/apis/settingsApi';

import PuspaModalOTP from './modal/otp';
import PuspaModalOTPPassword from './modal/otp-password';

// ----------------------------------------------------------------------

export default function ResultPage() {
  const { handleSuccess, handleError } = useAlert();
  const { sendOTP } = useApiAuthCalls();
  const {
    settingsUpdateApi,
    offDayUpdateApi,
    websiteUpdateApi,
    autoDeclareResultSettingsUpdateApi,
    maintenanceUpdateApi,
  } = useApiSettingsCalls();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const [passwordFormData, setPasswordFormData] = useState({
    old_password: '',
    new_password: '',
  });

  const [upiFormData, setUpiFormData] = useState({
    upi: '',
    name: '',
  });

  const [valueFormData, setValueFormData] = useState({
    deposit: {
      min: 0,
      max: 0,
    },
    withdraw: {
      min: 0,
      max: 0,
    },
    transfer: {
      min: 0,
      max: 0,
    },
    betting: {
      min: 0,
      max: 0,
    },
    withdraw_open: '',
    withdraw_close: '',
    reset_time: '',
    joining_bonus: '',
  });

  const [contactFormData, setContactFormData] = useState({
    mobile: '',
    web_link: '',
    whatsapp: '',
    telegram: '',
    facebook: '',
    instagram: '',
    youtube: '',
    twitter: '',
  });

  const [withdrawlFormData, setWithdrawlFormData] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  });

  const [appLinkFormData, setAppLinkFormData] = useState({
    app_link: '',
    share_message: '',
    welcome_text: '',
    privacy_policy: '',
    web_app_link: '',
  });

  const [appMaintenanceFormData, setAppMaintenanceFormData] = useState({
    app_version: '',
    maintainence_msg: '',
    maintainence: false,
  });

  const [webToggleData, setWebToggleData] = useState({
    webtoggle: false,
  });

  const [autoDeclareData, setAutoDeclareData] = useState({
    status: false,
  });

  // const [autoVerified, setAutoVerified] = useState();

  const fetchSettingsData = async () => {
    try {
      const settingsData = await settingsApi(); // Fetch users from the function
      setUpiFormData({ upi: settingsData?.data?.merchant_upi });
      setValueFormData({
        deposit: settingsData?.data?.deposit,
        withdraw: settingsData?.data?.withdraw,
        transfer: settingsData?.data?.transfer,
        betting: settingsData?.data?.betting,
        joining_bonus: settingsData?.data?.joining_bonus,
        withdraw_open: settingsData?.data?.withdraw_open,
        withdraw_close: settingsData?.data?.withdraw_close,
        reset_time: settingsData?.data?.reset_time,
      });
      setAppLinkFormData({
        app_link: settingsData?.data?.app_link,
        share_message: settingsData?.data?.share_message,
        welcome_text: settingsData?.data?.welcome_text,
        privacy_policy: settingsData?.data?.privacy_policy,
        web_app_link: settingsData?.data?.web_app_link,
      });
      setWithdrawlFormData(settingsData?.data?.withdrawl_off_day);
      setWebToggleData(settingsData?.data?.webtoggle);
      setContactFormData({
        mobile: settingsData?.data?.mobile,
        web_link: settingsData?.data?.web_link,
        whatsapp: settingsData?.data?.whatsapp,
        telegram: settingsData?.data?.telegram,
        facebook: settingsData?.data?.facebook,
        instagram: settingsData?.data?.instagram,
        youtube: settingsData?.data?.youtube,
        twitter: settingsData?.data?.twitter,
      });
      // console.log('withdrawlFormData: ', withdrawlFormData);
    } catch (err) {
      // console.log(err); // Store any error in state
    }
  };

  const fetchResultSettingsData = async () => {
    try {
      const settingsResultData = await settingsResultApi(); // Fetch users from the function
      setAutoDeclareData({
        status: settingsResultData?.status,
      });
    } catch (err) {
      // console.log(err); // Store any error in state
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const settingsData = await settingsApi('all'); // Fetch users from the function
        const settingsResultData = await settingsResultApi(); // Fetch users from the function
        setAutoDeclareData({
          status: settingsResultData?.status,
        });
        setUpiFormData({
          upi: settingsData?.data?.merchant_upi,
          name: settingsData?.data?.merchant_name,
        });
        setValueFormData({
          deposit: settingsData?.data?.deposit,
          withdraw: settingsData?.data?.withdraw,
          transfer: settingsData?.data?.transfer,
          betting: settingsData?.data?.betting,
          joining_bonus: settingsData?.data?.joining_bonus,
          withdraw_open: settingsData?.data?.withdraw_open,
          withdraw_close: settingsData?.data?.withdraw_close,
          reset_time: settingsData?.data?.reset_time,
        });
        setAppLinkFormData({
          app_link: settingsData?.data?.app_link,
          share_message: settingsData?.data?.share_message,
          welcome_text: settingsData?.data?.welcome_text,
          privacy_policy: settingsData?.data?.privacy_policy,
          web_app_link: settingsData?.data?.web_app_link,
        });
        setAppMaintenanceFormData({
          app_version: settingsData?.data?.app_version,
          maintainence_msg: settingsData?.data?.maintainence_msg,
          maintainence: settingsData?.data?.maintainence,
        });
        setWithdrawlFormData(settingsData?.data?.withdrawl_off_day);
        setWebToggleData(settingsData?.data?.webtoggle);
        setContactFormData({
          mobile: settingsData?.data?.mobile,
          web_link: settingsData?.data?.web_link,
          whatsapp: settingsData?.data?.whatsapp,
          telegram: settingsData?.data?.telegram,
          facebook: settingsData?.data?.facebook,
          instagram: settingsData?.data?.instagram,
          youtube: settingsData?.data?.youtube,
          twitter: settingsData?.data?.twitter,
        });
      } catch (err) {
        // console.log(err); // Store any error in state
      }
    };
    if (!isModalOpen) {
      fetchData();
    }
  }, [isModalOpen]);

  const handleUpiSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendOTP();
      handleSuccess('OTP Send successfully');
      setIsModalOpen(true);
    } catch (err) {
      handleError(err.response.data.message || 'Error occurred');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordFormData.old_password && passwordFormData.new_password) {
      try {
        await sendOTP();
        handleSuccess('OTP Send successfully');
        setIsPasswordModalOpen(true);
      } catch (err) {
        handleError(err.response.data.message || 'Error occurred');
      }
    }else{
      handleError('Password can\'t be empty');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  const handlValueSubmit = async (e) => {
    e.preventDefault();
    const {
      deposit,
      withdraw,
      transfer,
      betting,
      withdraw_open,
      withdraw_close,
      reset_time,
      joining_bonus,
    } = valueFormData;

    // console.log(withdraw_close);
    // console.log(conTime(withdraw_close));

    try {
      await settingsUpdateApi({
        deposit: { ...deposit },
        withdraw: { ...withdraw },
        transfer: { ...transfer },
        betting: { ...betting },
        withdraw_open: conTime(withdraw_open),
        withdraw_close: conTime(withdraw_close),
        reset_time: conTime(reset_time),
        joining_bonus: Number(joining_bonus),
      });
      handleSuccess("Value's updated successfully");
      fetchSettingsData();
    } catch (err) {
      handleError(err.response.data.message || 'Error occurred');
    }
  };

  const handlContactSubmit = async (e) => {
    e.preventDefault();

    try {
      await settingsUpdateApi({
        ...contactFormData,
      });
      handleSuccess("Contact's updated successfully");
      fetchSettingsData();
    } catch (err) {
      handleError(err.response.data.message || 'Error occurred');
    }
  };

  const handleStatusChange = async (event, newStatus) => {
    // console.log(withdrawlFormData);
    if (newStatus !== null) {
      setWithdrawlFormData(newStatus);
      // console.log(withdrawlFormData);
      await offDayUpdateApi({
        toggle: event,
      })
        .then((data) => {
          handleSuccess(data ? data?.message : 'Toggle successful');
          setWithdrawlFormData(data?.data);
          fetchSettingsData();
          // console.log(withdrawlFormData);
        })
        .catch((err) => {
          handleError(err ? err?.message : 'Toggle Error');
        });
    }
  };

  const handleWebsiteStatusChange = async () => {
    await websiteUpdateApi()
      .then((data) => {
        handleSuccess(data ? data?.message : 'Toggle successful');
        fetchSettingsData();
        // console.log(webToggleData);
      })
      .catch((err) => {
        handleError(err ? err?.message : 'Toggle Error');
      });
  };

  const handleAutoResultStatusChange = async () => {
    await autoDeclareResultSettingsUpdateApi()
      .then((data) => {
        handleSuccess(data ? data?.message : 'Toggle successful');
        fetchResultSettingsData();
        // console.log(webToggleData);
      })
      .catch((err) => {
        handleError(err ? err?.message : 'Toggle Error');
      });
  };

  const handleAppLinkSubmit = async (e) => {
    e.preventDefault();
    // console.log(appLinkFormData);
    try {
      await settingsUpdateApi({
        ...appLinkFormData,
      });
      handleSuccess('AppLink updated successfully');
      fetchSettingsData();
    } catch (err) {
      handleError(err.response.data.message || 'Error occurred');
    }
  };

  const handleMaintenanceChange = async (e, newStatus) => {
    e.preventDefault();

    if (newStatus !== null) {
      // console.log('newStatus', newStatus);
      // console.log(appMaintenanceFormData.maintainence);

      await maintenanceUpdateApi({
        app_version: appMaintenanceFormData.app_version,
        maintainence: appMaintenanceFormData.maintainence,
        maintainence_msg: appMaintenanceFormData.maintainence_msg,
      })
        .then((d) => {
          handleSuccess(d ? d?.message : 'Toggle successful');
          fetchSettingsData();
        })
        .catch((err) => {
          handleError(err ? err?.message : 'Toggle Error');
        });
    }
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4">App Settings</Typography>
      </Stack>

      <Card
        spacing={3}
        sx={{
          px: 3,
          py: 3,
          borderRadius: 2,
          mx: { xs: 1, sm: 2, md: 3, l: 5 },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Bank Settings</Typography>
          <ToggleButtonGroup
            value={webToggleData ? 'active' : 'inactive'}
            color={webToggleData ? 'success' : 'error'}
            exclusive
            onChange={(e) => handleWebsiteStatusChange()}
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
        <form onSubmit={handleUpiSubmit}>
          <Box
            component={Stack}
            direction="row"
            alignContent="center"
            justifyContent="space-evenly"
            alignItems="center"
            flexWrap="wrap"
            sx={{
              borderRadius: 2,
            }}
          >
            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '30%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={upiFormData.name}
              onChange={(e) => setUpiFormData({ ...upiFormData, name: e.target.value })}
              label="Merchant Nane"
            />

            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '30%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={upiFormData.upi}
              onChange={(e) => setUpiFormData({ ...upiFormData, upi: e.target.value })}
              label="Merchant UPI"
            />

            <LoadingButton
              size="large"
              type="submit"
              variant="contained"
              loadingPosition="center"
              color="inherit"
              sx={{ mb: { xs: 2, sm: 2 }, width: { xs: '100%', sm: 'auto' } }}
              onClick={handleUpiSubmit}
            >
              Submit
            </LoadingButton>
          </Box>
        </form>
      </Card>

      <Card
        spacing={3}
        sx={{
          px: 3,
          py: 3,
          borderRadius: 2,
          mx: { xs: 1, sm: 2, md: 3, l: 5 },
          my: 1,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Password Change</Typography>
        </Stack>
        <form onSubmit={handleUpiSubmit}>
          <Box
            component={Stack}
            direction="row"
            alignContent="center"
            justifyContent="space-evenly"
            alignItems="center"
            flexWrap="wrap"
            sx={{
              borderRadius: 2,
            }}
          >
            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '30%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={passwordFormData.old_password}
              onChange={(e) =>
                setPasswordFormData({ ...passwordFormData, old_password: e.target.value })
              }
              label="Old Password"
            />

            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '30%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={passwordFormData.new_password}
              onChange={(e) =>
                setPasswordFormData({ ...passwordFormData, new_password: e.target.value })
              }
              label="New Password"
            />

            <LoadingButton
              size="large"
              type="submit"
              variant="contained"
              loadingPosition="center"
              color="inherit"
              sx={{ mb: { xs: 2, sm: 2 }, width: { xs: '100%', sm: 'auto' } }}
              onClick={handlePasswordSubmit}
            >
              Submit
            </LoadingButton>
          </Box>
        </form>
      </Card>

      <Card
        spacing={3}
        sx={{
          px: 3,
          py: 3,
          borderRadius: 2,
          mx: { xs: 1, sm: 2, md: 3, l: 5 },
          my: 1,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Value&apos;s Settings</Typography>
        </Stack>
        <form onSubmit={handlValueSubmit}>
          <Box
            component={Stack}
            direction="row"
            alignContent="center"
            justifyContent="space-evenly"
            alignItems="center"
            flexWrap="wrap"
            sx={{
              borderRadius: 2,
            }}
          >
            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '30%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData.deposit.min}
              onChange={(e) =>
                setValueFormData({
                  ...valueFormData,
                  deposit: {
                    ...valueFormData.deposit,
                    min: Number(e.target.value),
                  },
                })
              }
              label="Minimum Deposit"
            />
            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '30%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData.deposit.max}
              onChange={(e) =>
                setValueFormData({
                  ...valueFormData,
                  deposit: {
                    ...valueFormData.deposit,
                    max: Number(e.target.value),
                  },
                })
              }
              label="Maximum Deposit"
            />
            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '30%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData.withdraw.min}
              onChange={(e) =>
                setValueFormData({
                  ...valueFormData,
                  withdraw: {
                    ...valueFormData.withdraw,
                    min: Number(e.target.value),
                  },
                })
              }
              label="Minimum Withdrawal"
            />
            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '30%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData.withdraw.max}
              onChange={(e) =>
                setValueFormData({
                  ...valueFormData,
                  withdraw: {
                    ...valueFormData.withdraw,
                    max: Number(e.target.value),
                  },
                })
              }
              label="Maximum Withdrawal"
            />
            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '30%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData.transfer.min}
              onChange={(e) =>
                setValueFormData({
                  ...valueFormData,
                  transfer: {
                    ...valueFormData.transfer,
                    min: Number(e.target.value),
                  },
                })
              }
              label="Minimum Transfer"
            />
            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '30%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData.transfer.max}
              onChange={(e) =>
                setValueFormData({
                  ...valueFormData,
                  transfer: {
                    ...valueFormData.transfer,
                    max: Number(e.target.value),
                  },
                })
              }
              label="Maximum Transfer"
            />
            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '30%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData.betting.min}
              onChange={(e) =>
                setValueFormData({
                  ...valueFormData,
                  betting: {
                    ...valueFormData.betting,
                    min: Number(e.target.value),
                  },
                })
              }
              label="Minimum Bid Amount"
            />
            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '30%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData.betting.max}
              onChange={(e) =>
                setValueFormData({
                  ...valueFormData,
                  betting: {
                    ...valueFormData.betting,
                    max: Number(e.target.value),
                  },
                })
              }
              label="Maximum Bid Amount"
            />

            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '30%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData.joining_bonus}
              onChange={(e) =>
                setValueFormData({ ...valueFormData, joining_bonus: e.target.value })
              }
              label="Welcome Bonus"
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                sx={{
                  width: '100%',
                  maxWidth: { xs: '100%', sm: '30%' },
                  mb: { xs: 2, sm: 2 },
                }}
                components={['TimePicker']}
              >
                <TimePicker
                  label="Withdraw Open Time"
                  sx={{
                    width: '100%',
                  }}
                  value={dayjs(`1970-01-01T${valueFormData.withdraw_open}`)}
                  onChange={(e) => {
                    setValueFormData({
                      ...valueFormData,
                      withdraw_open: e.$d.toLocaleTimeString(),
                    });
                  }}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                  // Additional styling to ensure responsiveness
                />
              </DemoContainer>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                sx={{
                  width: '100%',
                  maxWidth: { xs: '100%', sm: '30%' },
                  mb: { xs: 2, sm: 2 },
                }}
                components={['TimePicker']}
              >
                <TimePicker
                  label="Withdraw Close Time"
                  sx={{
                    width: '100%',
                  }}
                  value={dayjs(`1970-01-01T${valueFormData.withdraw_close}`)}
                  onChange={(e) => {
                    // console.log(e);
                    setValueFormData({
                      ...valueFormData,
                      withdraw_close: e.$d.toLocaleTimeString(),
                    });
                  }}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                  // Additional styling to ensure responsiveness
                />
              </DemoContainer>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                sx={{
                  width: '100%',
                  maxWidth: { xs: '100%', sm: '30%' },
                  mb: { xs: 2, sm: 2 },
                }}
                components={['TimePicker']}
              >
                <TimePicker
                  label="Reset Time"
                  sx={{
                    width: '100%',
                  }}
                  value={dayjs(`1970-01-01T${valueFormData.reset_time}`)}
                  onChange={(e) => {
                    setValueFormData({
                      ...valueFormData,
                      reset_time: e.$d.toLocaleTimeString(),
                    });
                  }}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                  // Additional styling to ensure responsiveness
                />
              </DemoContainer>
            </LocalizationProvider>

            <LoadingButton
              sx={{ mb: { xs: 2, sm: 2 }, width: { xs: '100%', sm: 'auto' } }}
              size="large"
              type="submit"
              variant="contained"
              loadingPosition="center"
              color="inherit"
              onClick={handlValueSubmit}
            >
              Submit
            </LoadingButton>
          </Box>
        </form>
      </Card>

      <Card
        spacing={3}
        sx={{
          px: 3,
          py: 3,
          borderRadius: 2,
          mx: { xs: 1, sm: 2, md: 3, l: 5 },
          my: 1,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Withdrawl Off Day&apos;s</Typography>
        </Stack>
        <form onSubmit={handlContactSubmit}>
          <Box
            component={Stack}
            direction="row"
            alignContent="center"
            justifyContent="space-evenly"
            alignItems="center"
            flexWrap="wrap"
            sx={{
              borderRadius: 2,
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
              <Typography variant="h6">Monday: &nbsp;&nbsp;&nbsp;</Typography>
              <ToggleButtonGroup
                value={withdrawlFormData?.monday ? 'active' : 'inactive'}
                color={withdrawlFormData?.monday ? 'success' : 'error'}
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
                value={withdrawlFormData?.tuesday ? 'active' : 'inactive'}
                color={withdrawlFormData?.tuesday ? 'success' : 'error'}
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
                value={withdrawlFormData?.wednesday ? 'active' : 'inactive'}
                color={withdrawlFormData?.wednesday ? 'success' : 'error'}
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
                value={withdrawlFormData?.thursday ? 'active' : 'inactive'}
                color={withdrawlFormData?.thursday ? 'success' : 'error'}
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
                value={withdrawlFormData?.friday ? 'active' : 'inactive'}
                color={withdrawlFormData?.friday ? 'success' : 'error'}
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
                value={withdrawlFormData?.saturday ? 'active' : 'inactive'}
                color={withdrawlFormData?.saturday ? 'success' : 'error'}
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
                value={withdrawlFormData?.sunday ? 'active' : 'inactive'}
                color={withdrawlFormData?.sunday ? 'success' : 'error'}
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
        </form>
      </Card>

      <Card
        spacing={3}
        sx={{
          px: 3,
          py: 3,
          borderRadius: 2,
          mx: { xs: 1, sm: 2, md: 3, l: 5 },
          my: 1,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Contact&apos;s Details</Typography>
        </Stack>
        <form onSubmit={handlContactSubmit}>
          <Box
            component={Stack}
            direction="row"
            alignContent="center"
            justifyContent="space-evenly"
            alignItems="center"
            flexWrap="wrap"
            sx={{
              borderRadius: 2,
            }}
          >
            <TextField
              name="Mobile Number"
              type="tel"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '30%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={contactFormData.mobile}
              onChange={(e) => setContactFormData({ ...contactFormData, mobile: e.target.value })}
              label="Mobile Number"
            />

            <TextField
              name="Website Link"
              type="tel"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '30%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={contactFormData.web_link}
              onChange={(e) => setContactFormData({ ...contactFormData, web_link: e.target.value })}
              label="Website Link"
            />

            <TextField
              name="Whatsapp Number"
              type="tel"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '30%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={contactFormData.whatsapp}
              onChange={(e) => setContactFormData({ ...contactFormData, whatsapp: e.target.value })}
              label="Whatsapp Number"
            />

            <TextField
              name="Telegram"
              type="tel"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '30%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={contactFormData.telegram}
              onChange={(e) => setContactFormData({ ...contactFormData, telegram: e.target.value })}
              label="Telegram Number"
            />

            <TextField
              name="Instagram"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '30%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={contactFormData.instagram}
              onChange={(e) =>
                setContactFormData({ ...contactFormData, instagram: e.target.value })
              }
              label="Instagram"
            />

            <TextField
              name="Facebook"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '30%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={contactFormData.facebook}
              onChange={(e) => setContactFormData({ ...contactFormData, facebook: e.target.value })}
              label="Facebook"
            />

            <TextField
              name="Youtube"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '30%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={contactFormData.youtube}
              onChange={(e) => setContactFormData({ ...contactFormData, youtube: e.target.value })}
              label="Youtube"
            />

            <TextField
              name="Twitter (X)"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '30%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={contactFormData.twitter}
              onChange={(e) => setContactFormData({ ...contactFormData, twitter: e.target.value })}
              label="Twitter (X)"
            />

            <LoadingButton
              sx={{ mb: { xs: 2, sm: 2 }, width: { xs: '100%', sm: 'auto' } }}
              size="large"
              type="submit"
              variant="contained"
              loadingPosition="center"
              color="inherit"
              onClick={handlContactSubmit}
            >
              Submit
            </LoadingButton>
          </Box>
        </form>
      </Card>

      <Card
        spacing={3}
        sx={{
          px: 3,
          py: 3,
          borderRadius: 2,
          mx: { xs: 1, sm: 2, md: 3, l: 5 },
          my: 1,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6">App Link Settings</Typography>
        </Stack>

        <Box
          component={Stack}
          direction="row"
          alignContent="center"
          justifyContent="space-evenly"
          alignItems="center"
          flexWrap="wrap"
          sx={{
            borderRadius: 2,
          }}
        >
          <form onSubmit={handleAppLinkSubmit}>
            <Box spacing={3} component={Stack} sx={{ py: { xs: 2, sm: 2 } }}>
              <TextField
                fullWidth
                name="text"
                value={appLinkFormData.app_link}
                sx={{
                  width: '100%',
                  maxWidth: { xs: '100%', sm: '100%' },
                  mb: { xs: 2, sm: 2 },
                }}
                onChange={(e) =>
                  setAppLinkFormData({ ...appLinkFormData, app_link: e.target.value })
                }
                label="App Link"
              />

              <Textarea
                minRows={3}
                maxRows={3}
                label="App Link"
                value={appLinkFormData.share_message}
                sx={{
                  width: '100%',
                  maxWidth: { xs: '100%', sm: '100%' },
                  mb: { xs: 2, sm: 2 },
                }}
                onChange={(e) =>
                  setAppLinkFormData({ ...appLinkFormData, share_message: e.target.value })
                }
                placeholder="Enter Share Message"
              />

              <TextField
                fullWidth
                name="text"
                value={appLinkFormData.welcome_text}
                sx={{
                  width: '100%',
                  maxWidth: { xs: '100%', sm: '100%' },
                  mb: { xs: 2, sm: 2 },
                }}
                onChange={(e) =>
                  setAppLinkFormData({ ...appLinkFormData, welcome_text: e.target.value })
                }
                label="Welcome Text"
              />

              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                loadingPosition="center"
                color="inherit"
                sx={{ mb: { xs: 2, sm: 2 }, width: { xs: '100%', sm: 'auto' } }}
                onClick={handleAppLinkSubmit}
              >
                Submit
              </LoadingButton>
            </Box>
          </form>

          <form onSubmit={handleAppLinkSubmit}>
            <Box spacing={3} component={Stack} sx={{ py: { xs: 2, sm: 2 } }}>
              <TextField
                fullWidth
                name="Privacy Policy Link"
                value={appLinkFormData.privacy_policy}
                sx={{
                  width: '100%',
                  maxWidth: { xs: '100%', sm: '100%' },
                  mb: { xs: 2, sm: 2 },
                }}
                onChange={(e) =>
                  setAppLinkFormData({ ...appLinkFormData, privacy_policy: e.target.value })
                }
                label="Privacy Policy Link"
              />

              <TextField
                fullWidth
                name="Web App Link"
                value={appLinkFormData.web_app_link}
                sx={{
                  width: '100%',
                  maxWidth: { xs: '100%', sm: '100%' },
                  mb: { xs: 2, sm: 2 },
                }}
                onChange={(e) =>
                  setAppLinkFormData({ ...appLinkFormData, web_app_link: e.target.value })
                }
                label="Web App Link"
              />

              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                loadingPosition="center"
                color="inherit"
                sx={{ mb: { xs: 2, sm: 2 }, width: { xs: '100%', sm: 'auto' } }}
                onClick={handleAppLinkSubmit}
              >
                Submit
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </Card>

      <Card
        spacing={3}
        sx={{
          px: 3,
          py: 3,
          borderRadius: 2,
          mx: { xs: 1, sm: 2, md: 3, l: 5 },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Maintainence Settings</Typography>
        </Stack>

        <Box
          component={Stack}
          direction="row"
          alignContent="center"
          justifyContent="space-evenly"
          alignItems="center"
          flexWrap="wrap"
          sx={{
            borderRadius: 2,
          }}
        >
          <form onSubmit={handleMaintenanceChange}>
            <Box
              spacing={3}
              component={Stack}
              direction="column"
              alignContent="center"
              justifyContent="space-evenly"
              alignItems="flex-start"
              sx={{
                borderRadius: 2,
              }}
            >
              <TextField
                fullWidth
                name="text"
                value={appMaintenanceFormData.app_version}
                onChange={(e) =>
                  setAppMaintenanceFormData({
                    ...appMaintenanceFormData,
                    app_version: e.target.value,
                  })
                }
                label="App Version"
              />

              <Textarea
                minRows={3}
                maxRows={3}
                label="App Link"
                value={appMaintenanceFormData.maintainence_msg}
                onChange={(e) =>
                  setAppMaintenanceFormData({
                    ...appMaintenanceFormData,
                    maintainence_msg: e.target.value,
                  })
                }
                placeholder="Enter Maintenance Message"
              />

              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">Maintenance Mode: &nbsp;&nbsp;&nbsp;</Typography>
                <ToggleButtonGroup
                  value={appMaintenanceFormData.maintainence ? 'active' : 'inactive'}
                  color={appMaintenanceFormData.maintainence ? 'success' : 'error'}
                  exclusive
                  onChange={(e, newValue) => {
                    // console.log('newValue: ', newValue);
                    setAppMaintenanceFormData({
                      ...appMaintenanceFormData,
                      maintainence: newValue === 'active',
                    });
                    // console.log(appMaintenanceFormData);
                  }}
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

              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                loadingPosition="center"
                color="inherit"
                onClick={handleMaintenanceChange}
              >
                Submit
              </LoadingButton>
            </Box>
          </form>
          <Box
            component={Stack}
            direction="column"
            alignContent="center"
            justifyContent="space-evenly"
            alignItems="center"
            flexWrap="wrap"
            sx={{
              borderRadius: 2,
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
              <Typography variant="h6">Website Toggle: &nbsp;&nbsp;&nbsp;</Typography>
              <ToggleButtonGroup
                value={webToggleData ? 'active' : 'inactive'}
                color={webToggleData ? 'success' : 'error'}
                exclusive
                onChange={(e) => handleWebsiteStatusChange()}
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

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
              <Typography variant="h6">Auto Declare Result: &nbsp;&nbsp;&nbsp;</Typography>
              <ToggleButtonGroup
                value={autoDeclareData.status ? 'active' : 'inactive'}
                color={autoDeclareData.status ? 'success' : 'error'}
                exclusive
                onChange={(e) => handleAutoResultStatusChange()}
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
      </Card>

      <PuspaModalOTP
        isOpen={isModalOpen}
        onClose={closeModal}
        upi={upiFormData.upi}
        name={upiFormData.name}
      />
      <PuspaModalOTPPassword
        isOpen={isPasswordModalOpen}
        onClose={closePasswordModal}
        old_password={passwordFormData.old_password}
        new_password={passwordFormData.new_password}
      />
    </Container>
  );
}
