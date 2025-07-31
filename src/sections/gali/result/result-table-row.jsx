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
  selected,
  id,
  market_name,
  market_id,
  result_id,
  to,
  open_declare,
  close_declare,
  open_result,
  close_result,
  resultListData,
  handleClick,
  handleDelete,
}) {
  // const [openMenu, setOpenMenu] = useState(null);
  const { handleSuccess, handleError } = useAlert();
  const { deleteResultApi, revartResultApi } = useApiResultCalls();

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
    if (deleteData.session === 'delete') {
      await deleteResultApi(data)
        .then((responds) => {
          // console.log(responds.data);
          handleDelete();
          handleSuccess(responds ? responds?.message : 'Delete successful');
        })
        .catch((err) => {
          handleDelete();
          handleError(err ? err?.message : 'Delete Error');
        });
    } else {
      // console.log(deleteData.market, 'Puspa');
      await revartResultApi(data)
        .then((responds) => {
          // console.log(responds.data);
          handleDelete();
          handleSuccess(responds ? responds?.message : 'Delete successful');
        })
        .catch((err) => {
          handleDelete();
          handleError(err ? err?.message : 'Delete Error');
        });
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} className="responsive-table" role="checkbox" selected={selected}>

        <TableCell data-label="#">{id}</TableCell>
        <TableCell data-label="Game Name">{market_name}</TableCell>
        <TableCell data-label="Result Date" >{formatOnlyDate(to)}</TableCell>
        <TableCell data-label="Open Declare">{open_declare ? formatDate(open_declare) : '-'}</TableCell>
        <TableCell  data-label="Result">{open_result || '-'}</TableCell>

        <TableCell align="right">
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
            Are you sure you want to discard all of your notes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button
            color={deleteData.session === 'delete' ? 'error' : 'warning'}
            variant="contained"
            onClick={() =>
              handleDeleteAction(
                deleteData.session === 'revert'
                  ? { market_id, query_date: resultListData }
                  : result_id
              )
            }
            autoFocus
          >
            {deleteData.session === 'delete' ? `Delete` : `Revert`} {market_name}&apos;s Resilt
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.number,
  selected: PropTypes.any,
  handleClick: PropTypes.func,
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
