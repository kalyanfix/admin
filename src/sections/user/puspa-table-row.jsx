import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

import { formatDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';
import { capitalizeString } from 'src/utils/format-string';

import { useAlert } from 'src/alert';
import { useApiUserCalls } from 'src/api/userApi';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function PuspaTableRow({
  selected,
  name,
  avatarUrl,
  date,
  mobile,
  balance,
  betting,
  active,
  transfer,
  user_id,
  openViewModal,
  handleToggle,
  openAddModal,
  openWithdrawModal,
  openBetModal,
  openTransModal,
}) {
  const { handleSuccess, handleError } = useAlert();
  const { userToggleApi, userDeleteApi } = useApiUserCalls();
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

  const handelView = (data) => {
    openViewModal(data);
    handleCloseMenu();
  };

  const handelDelete = async (data) => {
    await userDeleteApi(data)
      .then((response) => {
        handleSuccess(response?.message || 'Delete successful');
        handleDialogClose();
        handleToggle();
      })
      .catch((err) => {
        handleError(err?.message || 'Delete Error');
      });
  };

  const handelToggle = async (userId, data) => {
    await userToggleApi({ id: userId, toggle: data })
      .then((response) => {
        handleSuccess(response?.message || 'Toggle successful');
        handleToggle();
      })
      .catch((err) => {
        handleError(err?.message || 'Toggle Error');
      });
  };

  const numberCopy = (mobileNumber) => {
    navigator.clipboard
      .writeText(mobileNumber)
      .then(() => {
        // console.log(`Copied ${mobileNumber} to clipboard`);
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  };

  const openWhatsapp = (mobileNumber) => {
    const whatsappUrl = `https://wa.me/${mobileNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  const openCall = (mobileNumber) => {
    const callUrl = `tel:${mobileNumber}`;
    window.location.href = callUrl;
  };  

  return (
    <>
      <TableRow
        hover
        tabIndex={-1}
        role="checkbox"
        selected={selected}
        className="responsive-table"
      >
        <TableCell data-label="Name" component="th" scope="row" padding="none">
          <Stack direction="row" sx={{ pl: 1 }} alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell data-label="Mobile">
          <span
            role="button"
            tabIndex="0"
            style={{ cursor: 'pointer' }}
            onClick={() => openCall(mobile)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                openCall(mobile);
              }
            }}
          >
            {mobile}
          </span>{' '}
          <span
            role="button"
            tabIndex="0"
            style={{ cursor: 'pointer' }}
            onClick={() => numberCopy(mobile)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                numberCopy(mobile);
              }
            }}
          >
            <Iconify icon="solar:copy-bold-duotone" />
          </span>{' '}
          <span
            role="button"
            tabIndex="0"
            style={{ cursor: 'pointer' }}
            onClick={() => openWhatsapp(mobile)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                openWhatsapp(mobile);
              }
            }}
          >
            <Iconify icon="ic:baseline-whatsapp" />
          </span>
        </TableCell>

        <TableCell data-label="Date">{formatDate(date)}</TableCell>

        <TableCell data-label="Balance">₹ {fCurrency(balance)}</TableCell>

        <TableCell data-label="Betting" align="center">
          <Label
            style={{ cursor: 'pointer' }}
            onClick={() => handelToggle(user_id, 'betting')}
            color={betting ? 'success' : 'error'}
          >
            {betting ? 'Yes' : 'No'}
          </Label>
        </TableCell>

        <TableCell data-label="Active" align="center">
          <Label
            style={{ cursor: 'pointer' }}
            onClick={() => handelToggle(user_id, 'status')}
            color={active ? 'success' : 'error'}
          >
            {active ? 'Yes' : 'No'}
          </Label>
        </TableCell>

        <TableCell data-label="Transfer" align="center">
          <Label
            style={{ cursor: 'pointer' }}
            onClick={() => handelToggle(user_id, 'transfer')}
            color={transfer ? 'success' : 'error'}
          >
            {transfer ? 'Yes' : 'No'}
          </Label>
        </TableCell>

        <TableCell data-label="Actions" align="right">
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
        <MenuItem onClick={() => handelView(user_id)}>
          <Iconify icon="solar:eye-linear" sx={{ mr: 2 }} />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleCloseMenu();
            openAddModal(user_id, name);
          }}
          sx={{ color: 'success.main' }}
        >
          <Iconify icon="lets-icons:in-light" sx={{ mr: 2 }} />
          Add
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleCloseMenu();
            openWithdrawModal(user_id, name);
          }}
          sx={{ color: 'error.dark' }}
        >
          <Iconify icon="lets-icons:out-light" sx={{ mr: 2 }} />
          Withdraw
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleCloseMenu();
            openTransModal(user_id, name);
          }}
        >
          <Iconify icon="grommet-icons:transaction" sx={{ mr: 2 }} />
          Transaction
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleCloseMenu();
            openBetModal(user_id, name);
          }}
        >
          <Iconify icon="iconamoon:history-duotone" sx={{ mr: 2 }} />
          Bet History
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
            Are you sure you want to delete {capitalizeString(name)}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button color="error" variant="contained" onClick={() => handelDelete(user_id)} autoFocus>
            Delete {capitalizeString(name)}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

PuspaTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  mobile: PropTypes.string,
  name: PropTypes.any,
  date: PropTypes.any,
  balance: PropTypes.any,
  betting: PropTypes.any,
  active: PropTypes.any,
  transfer: PropTypes.any,
  selected: PropTypes.any,
  user_id: PropTypes.string,
  handleToggle: PropTypes.func,
  openViewModal: PropTypes.func,
  openAddModal: PropTypes.func,
  openWithdrawModal: PropTypes.func,
  openBetModal: PropTypes.func,
  openTransModal: PropTypes.func,
};
