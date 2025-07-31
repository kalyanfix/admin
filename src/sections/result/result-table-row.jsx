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

import { formatDate, formatOnlyDate } from 'src/utils/format-time';

import { useAlert } from 'src/alert';
import { useApiResultCalls } from 'src/api/resultApi';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  market_name,
  market_id,
  result_id,
  to,
  open_declare,
  close_declare,
  open_result,
  close_result,
  handleDelete,
  resultListData,
}) {
  const { handleSuccess, handleError } = useAlert();
  const { deleteResultApi, revartResultApi, deleteOpenResultApi, deleteCloseResultApi } =
    useApiResultCalls();

  const [openDialog, setOpenDialog] = useState(false);
  const [deleteData, setDeleteData] = useState({});

  const handleDialogOpen = (delData) => {
    // console.log(delData);
    setDeleteData(delData);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDeleteAction = async (data) => {
    // console.log(data);
    handleDialogClose();

    const actions = {
      delete: deleteResultApi,
      open: deleteOpenResultApi,
      close: deleteCloseResultApi,
      revert: revartResultApi,
    };

    const action = actions[deleteData.session];

    if (action) {
      try {
        const response = await action(data);
        // console.log(response.data);
        handleDelete();
        handleSuccess(response ? response.message : 'Action successful');
      } catch (err) {
        handleDelete();
        handleError(err ? err.message : 'Action Error');
      }
    }
  };

  const getButtonText = () => {
    switch (deleteData.session) {
      case 'delete':
        return `Delete ${market_name}'s Result`;
      case 'open':
        return `Delete ${market_name}'s Open Result`;
      case 'close':
        return `Delete ${market_name}'s Close Result`;
      case 'revert':
        return `Revert ${market_name}'s Result`;
      default:
        return '';
    }
  };

  return (
    <>
      <TableRow hover className="responsive-table">
        <TableCell data-label="#">{id}</TableCell>
        <TableCell data-label="Game Name">{market_name}</TableCell>
        <TableCell data-label="Result Date">{formatOnlyDate(to)}</TableCell>
        <TableCell data-label="Open Declare">{open_declare ? formatDate(open_declare) : '-'}</TableCell>
        <TableCell data-label="Close Declare">{close_declare ? formatDate(close_declare) : '-'}</TableCell>
        <TableCell data-label="Open Panna" align="center">
          {open_result || '-'}
          {open_result && (
            <IconButton
              sx={{ color: 'error.main' }}
              onClick={() => handleDialogOpen({ session: 'open', result: result_id })}
            >
              <Iconify icon="ant-design:delete-twotone" />
            </IconButton>
          )}
        </TableCell>
        <TableCell data-label="Close Panna" align="center">
          {close_result || '-'}
          {close_result && (
            <IconButton
              sx={{ color: 'error.main' }}
              onClick={() => handleDialogOpen({ session: 'close', result: result_id })}
            >
              <Iconify icon="ant-design:delete-twotone" />
            </IconButton>
          )}
        </TableCell>

        <TableCell data-label="Action" align="right">
          <IconButton
            sx={{ color: 'warning.main' }}
            onClick={() => handleDialogOpen({ session: 'revert', market: market_id })}
          >
            <Iconify icon="ion:reload-circle" />
          </IconButton>
          <IconButton
            sx={{ color: 'error.main' }}
            onClick={() => handleDialogOpen({ session: 'delete', result: result_id })}
          >
            <Iconify icon="ant-design:delete-twotone" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
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
            Are you sure you want to procied with your dicition?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button
            color={deleteData.session === 'delete' ? 'error' : 'warning'}
            variant="contained"
            autoFocus
            onClick={() =>
              handleDeleteAction(
                deleteData.session === 'revert'
                  ? { market_id, query_date: resultListData }
                  : result_id
              )
            }
          >
            {getButtonText()}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.number,
  market_name: PropTypes.string,
  market_id: PropTypes.string,
  result_id: PropTypes.string,
  to: PropTypes.string,
  open_declare: PropTypes.string,
  close_declare: PropTypes.string,
  open_result: PropTypes.string,
  close_result: PropTypes.string,
  resultListData: PropTypes.string,
  handleDelete: PropTypes.func,
};
