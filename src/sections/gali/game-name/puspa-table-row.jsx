 import { useState } from 'react';
import PropTypes from 'prop-types';

// import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
// import Typography from '@mui/material/Typography';

import { convertTime } from 'src/utils/format-time';

import { useAlert } from 'src/alert';
import { useApiMarketCalls } from 'src/api/marketApi';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function PuspaTableRow({
  id,
  market_id,
  name,
  name_hindi,
  // open_time,
  close_time,
  status,
  market_status,
  handleToggle,
  openEditModal,
  market_off_day,
  openDayModal
}) {
  const { handleSuccess, handleError } = useAlert();
  const { marketToggleApi, marketDeleteApi } = useApiMarketCalls();

  const [open, setOpen] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
    handleCloseMenu();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handelDelete = async (data) => {
    // console.log(data);
    await marketDeleteApi(data)
    .then((responds) => {
      // console.log(responds.data);
      handleSuccess(responds ? responds?.message : 'Delete successful');
      handleToggle();
      handleDialogClose();
      })
      .catch((err) => {
        handleError(err ? err?.message : 'Delete Error');
      });
  };

  const handelToggle = async (data) => {
    // console.log(data);
    await marketToggleApi({ id: data })
      .then((responds) => {
        // console.log(responds.data);
        handleSuccess(responds ? responds?.message : 'Toggle successful');
        handleToggle();
      })
      .catch((err) => {
        handleError(err ? err?.message : 'Toggle Error');
      });
  };

  const handleEditMarket = (data) => {
    openEditModal(data);
    handleCloseMenu();
  };

  const handleDayOffMarket = (data) => {
    openDayModal(data);
    handleCloseMenu();
  };

  return (
    <>
      <TableRow>

        <TableCell>{id}</TableCell>

        <TableCell>{name}</TableCell>

        <TableCell>{name_hindi}</TableCell>

        {/* <TableCell>{convertTime(open_time)}</TableCell> */}

        <TableCell>{convertTime(close_time)}</TableCell>

        <TableCell align="center">
          <Label
            style={{ cursor: 'pointer' }}
            onClick={() => handelToggle(market_id)}
            color={status ? 'success' : 'error'}
          >
            {status ? 'Yes' : 'No'}
          </Label>
        </TableCell>

        <TableCell>
          <Label color={market_status ? 'success' : 'error'}>
            Today {market_status ? 'Open' : 'Closed'}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem
          onClick={() => handleEditMarket({ market_id, name, name_hindi, close_time })}
        >
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={() => handleDayOffMarket({market_id, market_off_day, name })}>
          <Iconify icon="uim:calender" sx={{ mr: 2 }} />
          Day Off
        </MenuItem>

        <MenuItem onClick={() => handleDialogOpen()} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to discard all of your notes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleDialogClose}>Cancel</Button>
          <Button color="error" variant="contained" onClick={() => handelDelete(market_id)} autoFocus>
            Delete Game
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

PuspaTableRow.propTypes = {
  id: PropTypes.any,
  market_id: PropTypes.any,
  name: PropTypes.any,
  name_hindi: PropTypes.any,
  // open_time: PropTypes.any,
  close_time: PropTypes.any,
  status: PropTypes.bool,
  market_status: PropTypes.bool,
  market_off_day: PropTypes.any,
  handleToggle: PropTypes.func,
  openEditModal: PropTypes.func,
  openDayModal: PropTypes.func,
};
