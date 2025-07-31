import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Iconify from 'src/components/iconify';

export default function PuspaTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  selectTableDate,
  handleSelectMarket,
  handleTableDateSelect,
}) {
  const [market, setMarket] = useState('main');

  return (
    <Toolbar
      sx={{
        height: { xs: 'auto', sm: 96 }, // Adjust height based on screen size
        flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on small screens
        alignItems: 'center',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(1, 2), // Adjust padding for responsiveness
        gap: { xs: 2, sm: 0 }, // Add gap between elements on small screens
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Stack
          direction={{ xs: 'column', sm: 'row' }} // Stack vertically on small screens
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          spacing={2} // Add spacing between items for small screens
        >
          <OutlinedInput
            value={filterName}
            onChange={onFilterName}
            placeholder="Search user..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            }
            sx={{
              width: { xs: '100%', sm: 'auto' }, // Full width on small screens
              maxWidth: { sm: 200 }, // Limit max width on larger screens
            }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
            <DatePicker
              label="Select Date"
              value={selectTableDate}
              onChange={handleTableDateSelect}
              maxDate={dayjs()}
              sx={{
                width: { xs: '100%', sm: 'auto' }, // Full width on small screens
                maxWidth: { sm: 200 }, // Limit max width on larger screens
              }}
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>

          <FormControl
            sx={{
              width: { xs: '100%', sm: 'auto' }, // Full width on small screens
              maxWidth: { sm: 150 }, // Limit max width on larger screens
            }}
          >
            <InputLabel id="market-select-label">Market</InputLabel>
            <Select
              labelId="market-select-label"
              id="market-select"
              label="Market"
              value={market}
              onChange={(event) => {
                const newValue = event.target.value;
                setMarket(newValue);
                handleSelectMarket(newValue);
              }}
            >
              <MenuItem value="main">Main</MenuItem>
              <MenuItem value="starline">Starline</MenuItem>
              <MenuItem value="galidisawar">Gali-Di-Sawar</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      )}
    </Toolbar>
  );
}

PuspaTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  selectTableDate: PropTypes.object,
  handleSelectMarket: PropTypes.func,
  handleTableDateSelect: PropTypes.func,
};
