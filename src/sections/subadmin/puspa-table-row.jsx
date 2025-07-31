import { useState } from 'react';
import PropTypes from 'prop-types';

// import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
// import Typography from '@mui/material/Typography';

import { formatDate } from 'src/utils/format-time';

import { useAlert } from 'src/alert';
import { useApiAdminCalls } from 'src/api/adminApi';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function PuspaTableRow({
  id,
  admin_id,
  name,
  user_name,
  mobile,
  status,
  handleToggle,
  createdAt,
  openEditModal,
  openDayModal,
}) {
  const { handleSuccess, handleError } = useAlert();
  const { adminToggleApi, adminDeleteApi } = useApiAdminCalls();

  // const [open, setOpen] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setOpen(null);
  // };

  const handelDelete = async (data) => {
    // console.log(data);
    await adminDeleteApi(data)
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
    await adminToggleApi({ id: data })
      .then((responds) => {
        // console.log(responds.data);
        handleSuccess(responds ? responds?.message : 'Toggle successful');
        handleToggle();
      })
      .catch((err) => {
        handleError(err ? err?.message : 'Toggle Error');
      });
  };

  // const handleEditMarket = (data) => {
  //   openEditModal(data);
  //   handleCloseMenu();
  // };

  // const handleDayOffMarket = (data) => {
  //   openDayModal(data);
  //   handleCloseMenu();
  // };

  return (
    <>
      <TableRow className="responsive-table">
        <TableCell data-label="#">{id}</TableCell>

        <TableCell data-label="Name">{name}</TableCell>

        <TableCell data-label="User Name">{user_name}</TableCell>

        <TableCell data-label="Mobile">{mobile}</TableCell>

        <TableCell data-label="Date">{formatDate(createdAt)}</TableCell>

        <TableCell data-label="Active" align="center">
          <Label
            style={{ cursor: 'pointer' }}
            onClick={() => handelToggle(admin_id)}
            color={status ? 'success' : 'error'}
          >
            {status ? 'Yes' : 'No'}
          </Label>
        </TableCell>

        <TableCell data-label="Action" align="right">
          <IconButton sx={{ color: 'error.main' }} onClick={() => handleDialogOpen()}>
            <Iconify icon="ant-design:delete-twotone" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* <Popover
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
          onClick={() => handleEditMarket({ market_id, name, name_hindi, open_time, close_time })}
        >
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={() => handleDayOffMarket({ market_id, market_off_day, name })}>
          <Iconify icon="uim:calender" sx={{ mr: 2 }} />
          Day Off
        </MenuItem>

        <MenuItem onClick={() => handleDialogOpen()} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover> */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this Sub-Admin?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => handelDelete(admin_id)}
            autoFocus
          >
            Delete Sub-Admin
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

PuspaTableRow.propTypes = {
  id: PropTypes.any,
  admin_id: PropTypes.any,
  name: PropTypes.any,
  user_name: PropTypes.any,
  mobile: PropTypes.any,
  createdAt: PropTypes.any,
  status: PropTypes.bool,
  handleToggle: PropTypes.func,
  openEditModal: PropTypes.func,
  openDayModal: PropTypes.func,
};
