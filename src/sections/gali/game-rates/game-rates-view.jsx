import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAlert } from 'src/alert';
import { settingsApi } from 'src/apis/settingsApi';
import { useApiSettingsCalls } from 'src/api/settingsApi';

// ----------------------------------------------------------------------

export default function GameRatesPage() {
  const { handleSuccess, handleError } = useAlert();
  const { settingsUpdateApi } = useApiSettingsCalls();

  const [valueFormData, setValueFormData] = useState({
    jodi_digit_1: '',
    jodi_digit_2: '',
    left_digit_1: '',
    left_digit_2: '',
    right_digit_1: '',
    right_digit_2: '',
  });

  const fetchSettingsData = async () => {
    try {
      const settingsData = await settingsApi('all'); // Fetch users from the function
      // console.log(settingsData?.data?.rates);
      setValueFormData(settingsData?.data?.rates?.galidisawar);
    } catch (err) {
      // console.log(err); // Store any error in state
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const settingsData = await settingsApi('all'); // Fetch users from the function
        // console.log(settingsData?.data?.rates);
        setValueFormData(settingsData?.data?.rates?.galidisawar);
      } catch (err) {
        // console.log(err); // Store any error in state
      }
    };
    fetchData(); // API call when modal is closed
  }, []);

  const handlValueSubmit = async (e) => {
    e.preventDefault();

    try {
      await settingsUpdateApi({ galidisawar: { ...valueFormData } });
      handleSuccess('Rates updated successfully');
      fetchSettingsData();
    } catch (err) {
      handleError(err.response.data.message || 'Error occurred');
    }
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Gali-Di-Sawar Game Rates</Typography>
      </Stack>

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
          <Typography variant="h6"> Gali-Di-Sawar Value&apos;s Settings</Typography>
        </Stack>
        <form onSubmit={() => handlValueSubmit}>
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
                maxWidth: { xs: '100%', sm: '45%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData?.jodi_digit_1}
              onChange={(e) => setValueFormData({ ...valueFormData, jodi_digit_1: e.target.value })}
              label="Jodi Digit Value 1"
            />
            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '45%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData?.jodi_digit_2}
              onChange={(e) => setValueFormData({ ...valueFormData, jodi_digit_2: e.target.value })}
              label="Jodi Digit Value 2"
            />

            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '45%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData?.left_digit_1}
              onChange={(e) => setValueFormData({ ...valueFormData, left_digit_1: e.target.value })}
              label="Left Digit Value 1"
            />
            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '45%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData?.left_digit_2}
              onChange={(e) => setValueFormData({ ...valueFormData, left_digit_2: e.target.value })}
              label="Left Digit Value 2"
            />

            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '45%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData?.right_digit_1}
              onChange={(e) =>
                setValueFormData({ ...valueFormData, right_digit_1: e.target.value })
              }
              label="Right Digit Value 1"
            />
            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '45%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData?.right_digit_2}
              onChange={(e) =>
                setValueFormData({ ...valueFormData, right_digit_2: e.target.value })
              }
              label="Right Digit Value 2"
            />
          </Box>
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
            <LoadingButton
              size="large"
              type="submit"
              variant="contained"
              loadingPosition="center"
              sx={{ mb: { xs: 2, sm: 2 }, width: { xs: '100%', sm: 'auto' } }}
              color="inherit"
              onClick={handlValueSubmit}
            >
              Submit
            </LoadingButton>
          </Box>
        </form>
      </Card>
    </Container>
  );
}
