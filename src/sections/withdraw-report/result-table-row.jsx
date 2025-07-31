import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

import { formatDate } from 'src/utils/format-time';
import { capitalizeString } from 'src/utils/format-string';

import { useAlert } from 'src/alert';
import { useApiResultCalls } from 'src/api/resultApi';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'pending':
      return 'warning';
    default:
      return 'error';
  }
};

export default function UserTableRow({ id, amount, status, user_name, mobile, updatedAt }) {
  const { handleSuccess, handleError } = useAlert();
  const { deleteResultApi } = useApiResultCalls();

  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => setOpenDialog(true);

  const handleDialogClose = () => setOpenDialog(false);

  const handleDelete = async () => {
    handleDialogClose();
    try {
      const response = await deleteResultApi('data');
      handleSuccess(response ? response?.message : 'Toggle successful');
    } catch (err) {
      handleError(err ? err?.message : 'Toggle Error');
    }
  };

  return (
    <>
      <TableRow hover>
        <TableCell>{id}</TableCell>
        <TableCell>{capitalizeString(user_name)}</TableCell>
        <TableCell>{mobile}</TableCell>
        <TableCell>{amount}</TableCell>
        <TableCell>
          <Label color={getStatusColor(status)}>{status}</Label>
        </TableCell>
        <TableCell>{formatDate(updatedAt)}</TableCell>
        <TableCell align="left">
          <IconButton sx={{ color: 'secondary.main' }} onClick={handleDialogOpen}>
            <Iconify icon="noto:eye" />
          </IconButton>
        </TableCell>
        <TableCell align="left">
          <IconButton disabled={status !== 'pending'} sx={{ color: 'success.main' }} onClick={handleDialogOpen}>
            <Iconify icon="mdi:tick-circle-outline" />
          </IconButton>
          <IconButton disabled={status !== 'pending'} sx={{ color: 'error.main' }} onClick={handleDialogOpen}>
            <Iconify icon="mdi:cross-circle-outline" />
          </IconButton>
        </TableCell>
      </TableRow>

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
          <Button variant="contained" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button color="error" variant="contained" onClick={handleDelete} autoFocus>
            Delete Result
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.number,
  amount: PropTypes.number,
  user_name: PropTypes.string,
  mobile: PropTypes.string,
  status: PropTypes.string,
  updatedAt: PropTypes.string,
};
