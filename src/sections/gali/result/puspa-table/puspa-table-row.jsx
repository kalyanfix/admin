import { useState } from 'react';
import PropTypes from 'prop-types';

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

import { fCurrency } from 'src/utils/format-number';
import { capitalizeString } from 'src/utils/format-string';

import { useAlert } from 'src/alert';
import { useApiUserCalls } from 'src/api/userApi';

import Iconify from 'src/components/iconify';

export default function PuspaTableRow({
  id,
  user_name,
  market_name,
  game_mode,
  open_digit,
  close_digit,
  bet_amount,
  winning_amount,
  user_id,
  openEditBetModal,
}) {
  const { handleSuccess, handleError } = useAlert();
  const { userDeleteApi } = useApiUserCalls();

  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
    handlePopoverClose();
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await userDeleteApi(user_id);
      handleSuccess(response?.message || 'Delete successful');
      handleDialogClose();
    } catch (err) {
      handleError(err?.message || 'Delete Error');
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>{capitalizeString(user_name)}</TableCell>
        <TableCell>{market_name}</TableCell>
        <TableCell>{game_mode}</TableCell>
        <TableCell>{open_digit}</TableCell>
        <TableCell>{close_digit}</TableCell>
        <TableCell>₹ {fCurrency(bet_amount)}</TableCell>
        <TableCell>₹ {fCurrency(winning_amount)}</TableCell>
        <TableCell align="right">
          <IconButton
            onClick={() => {
              openEditBetModal({ id, open_digit, close_digit });
            }}
          >
            <Iconify icon="basil:edit-outline" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!popoverAnchor}
        anchorEl={popoverAnchor}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { width: 140 } }}
      >
        <MenuItem onClick={() => handlePopoverClose()}>
          <Iconify icon="solar:eye-linear" sx={{ mr: 2 }} />
          View
        </MenuItem>
        <MenuItem onClick={handlePopoverClose} sx={{ color: 'success.main' }}>
          <Iconify icon="lets-icons:in-light" sx={{ mr: 2 }} />
          Add
        </MenuItem>
        <MenuItem onClick={handlePopoverClose} sx={{ color: 'error.dark' }}>
          <Iconify icon="lets-icons:out-light" sx={{ mr: 2 }} />
          Withdraw
        </MenuItem>
        <MenuItem onClick={handleDialogOpen} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {capitalizeString(user_name)}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button color="error" variant="contained" onClick={handleDelete} autoFocus>
            Delete {capitalizeString(user_name)}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

PuspaTableRow.propTypes = {
  id: PropTypes.string,
  user_name: PropTypes.string,
  market_name: PropTypes.string,
  game_mode: PropTypes.string,
  open_digit: PropTypes.string,
  close_digit: PropTypes.string,
  bet_amount: PropTypes.number,
  winning_amount: PropTypes.number,
  user_id: PropTypes.string,
  openEditBetModal: PropTypes.func,
};
