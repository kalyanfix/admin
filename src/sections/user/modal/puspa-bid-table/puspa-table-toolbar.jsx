import 'dayjs/locale/en-gb';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import useMediaQuery from '@mui/material/useMediaQuery';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

export default function PuspaTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  handleSelectMarket,
}) {
  const [market, setMarket] = useState('main');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Toolbar
      sx={{
        height: isMobile ? 196 : 96,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: isMobile ? 'center' : 'space-between',
        alignItems: 'center',
        padding: theme.spacing(0, 1, 0, 3),
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
        <Stack direction={isMobile ? 'column' : 'row'} alignItems="center" spacing={2} sx={{ width: '100%' }}>
          <OutlinedInput
            value={filterName}
            onChange={onFilterName}
            placeholder="Search market..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            }
            sx={{ flexGrow: 1, mb: isMobile ? 2 : 0 }}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Market</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Market"
              value={market}
              onChange={(newValue) => {
                setMarket(newValue.target.value);
                handleSelectMarket(newValue.target.value);
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
  handleSelectMarket: PropTypes.func,
};
