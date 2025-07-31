import React, { useState, useEffect, useCallback } from 'react';

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
    single_digit_1: '',
    single_digit_2: '',
    jodi_digit_1: '',
    jodi_digit_2: '',
    single_panna_1: '',
    single_panna_2: '',
    double_panna_1: '',
    double_panna_2: '',
    tripple_panna_1: '',
    tripple_panna_2: '',
    half_sangum_1: '',
    half_sangum_2: '',
    full_sangum_1: '',
    full_sangum_2: '',
    even_odd_digit_1: '',
    even_odd_digit_2: '',
    double_even_odd_1: '',
    double_even_odd_2: '',
  });

  const fetchSettingsData = useCallback(async () => {
    try {
      const settingsData = await settingsApi('all');
      setValueFormData(settingsData?.data?.rates?.main);
    } catch (err) {
      // console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchSettingsData();
  }, [fetchSettingsData]);

  const handlValueSubmit = async (e) => {
    e.preventDefault();

    try {
      await settingsUpdateApi({ main: { ...valueFormData } });
      handleSuccess('Rates updated successfully');
      fetchSettingsData();
    } catch (err) {
      handleError(err.response.data.message || 'Error occurred');
    }
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Game Rates</Typography>
      </Stack>

      <Card
        spacing={3}
        sx={{
          px: 3,
          py: 3,
          borderRadius: 2,
          mx: 5,
          my: 1,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Value&apos;s Settings</Typography>
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
              value={valueFormData?.single_digit_1}
              onChange={(e) =>
                setValueFormData({ ...valueFormData, single_digit_1: e.target.value })
              }
              label="Single Digit Value 1"
            />

            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '45%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData?.single_digit_2}
              onChange={(e) =>
                setValueFormData({ ...valueFormData, single_digit_2: e.target.value })
              }
              label="Single Digit Value 2"
            />

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
              value={valueFormData?.single_panna_1}
              onChange={(e) =>
                setValueFormData({ ...valueFormData, single_panna_1: e.target.value })
              }
              label="Single Pana Value 1"
            />
            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '45%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData?.single_panna_2}
              onChange={(e) =>
                setValueFormData({ ...valueFormData, single_panna_2: e.target.value })
              }
              label="Single Pana Value 2"
            />
            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '45%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData?.double_panna_1}
              onChange={(e) =>
                setValueFormData({ ...valueFormData, double_panna_1: e.target.value })
              }
              label="Double Pana Value 1"
            />
            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '45%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData?.double_panna_2}
              onChange={(e) =>
                setValueFormData({ ...valueFormData, double_panna_2: e.target.value })
              }
              label="Double Pana Value 2"
            />

            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '45%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData?.tripple_panna_1}
              onChange={(e) =>
                setValueFormData({ ...valueFormData, tripple_panna_1: e.target.value })
              }
              label="Tripple Pana Value 1"
            />

            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '45%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData?.tripple_panna_2}
              onChange={(e) =>
                setValueFormData({ ...valueFormData, tripple_panna_2: e.target.value })
              }
              label="Tripple Pana Value 2"
            />

            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '45%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData?.half_sangum_1}
              onChange={(e) =>
                setValueFormData({ ...valueFormData, half_sangum_1: e.target.value })
              }
              label="Half Sangam Value 1"
            />

            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '45%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData?.half_sangum_2}
              onChange={(e) =>
                setValueFormData({ ...valueFormData, half_sangum_2: e.target.value })
              }
              label="Half Sangam Value 2"
            />

            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '45%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData?.full_sangum_1}
              onChange={(e) =>
                setValueFormData({ ...valueFormData, full_sangum_1: e.target.value })
              }
              label="Full Sangam Value 1"
            />

            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '45%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData?.full_sangum_2}
              onChange={(e) =>
                setValueFormData({ ...valueFormData, full_sangum_2: e.target.value })
              }
              label="Full Sangam Value 2"
            />

            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '45%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData?.even_odd_digit_1}
              onChange={(e) =>
                setValueFormData({ ...valueFormData, even_odd_digit_1: e.target.value })
              }
              label="Even Odd Digit Value 1"
            />

            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '45%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData?.even_odd_digit_2}
              onChange={(e) =>
                setValueFormData({ ...valueFormData, even_odd_digit_2: e.target.value })
              }
              label="Even Odd Digit Value 2"
            />

            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '45%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData?.double_even_odd_1}
              onChange={(e) =>
                setValueFormData({ ...valueFormData, double_even_odd_1: e.target.value })
              }
              label="Double Even Odd Value 1"
            />

            <TextField
              name="text"
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '45%' },
                mb: { xs: 2, sm: 2 },
              }}
              value={valueFormData?.double_even_odd_2}
              onChange={(e) =>
                setValueFormData({ ...valueFormData, double_even_odd_2: e.target.value })
              }
              label="Double Even Odd Value 2"
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
