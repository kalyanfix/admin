import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableToolbar({ numSelected, filterName, onFilterName, selectTableDate, handleTableDateSelect }) {

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
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
        <Stack direction="row" alignItems="center" justifyContent="space-between" width="100vh">
          <OutlinedInput
            value={filterName}
            onChange={onFilterName}
            placeholder="Search Result..."
            sx={{
              width: '45%',
              maxWidth: { xs: '35%', md: '40%' },
            }}
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
            <DemoContainer 
            components={['DatePicker']}
            sx={{ 
              width: '49%', 
              maxWidth: { xs: '100%'},
              minWidth: 200,
              mb: { xs: 1, sm: 0 } 
            }}
            >
              <DatePicker
                label="Select Date"
                defaultValue={selectTableDate}
                sx={{ 
                  width: '100%', 
                  maxWidth: { xs: '49%'}
                }}
                format="DD/MM/YYYY"
                onChange={(newValue) => {
                  handleTableDateSelect(newValue)
                }}
                maxDate={dayjs()}
              />
            </DemoContainer>
          </LocalizationProvider>

          {/* <Button variant="contained" size="large" color="inherit">
            Submit
          </Button> */}
        </Stack>
      )}

      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )} */}
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  handleTableDateSelect: PropTypes.func,
  selectTableDate: PropTypes.any
};
