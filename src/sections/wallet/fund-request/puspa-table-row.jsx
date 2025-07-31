import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { formatDate } from 'src/utils/format-time';
import { capitalizeString } from 'src/utils/format-string';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

export default function PuspaTableRow({
  id,
  user,
  amount,
  prev_balance,
  current_balance,
  status,
  view,
  trxId,
  updatedAt,
  openViewModal,
  openActionModal,
}) {
  const handleOpenViewModal = () => {
    openViewModal(view);
  };

  const handleOpenActionModal = (data) => {
    openActionModal({ amount, trxId, status: data });
  };

  const getStatusColor = (colorStatus) => {
    switch (colorStatus) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      default:
        return 'error';
    }
  };

  return (
    <TableRow hover className="responsive-table">
      <TableCell data-label="#">{id}</TableCell>
      <TableCell data-label="User">{capitalizeString(user)}</TableCell>
      <TableCell data-label="Amount">{amount}</TableCell>
      <TableCell data-label="Prev. Balence">{prev_balance}</TableCell>
      <TableCell data-label="Balence">{current_balance}</TableCell>
      <TableCell data-label="Status">
        <Label color={getStatusColor(status === 'success' ? 'completed' : status)}>{status}</Label>
      </TableCell>

      {view && (
        <TableCell align="left" data-label="View">
          <IconButton sx={{ color: 'secondary.main' }} onClick={handleOpenViewModal}>
            <Iconify icon="noto:eye" />
          </IconButton>
        </TableCell>
      )}

      <TableCell data-label="Date">{formatDate(updatedAt)}</TableCell>

      {view && (
        <TableCell align="left" data-label="Action">
          <IconButton
            disabled={status !== 'pending'}
            sx={{ color: 'success.main' }}
            onClick={() => handleOpenActionModal('accept')}
          >
            <Iconify icon="mdi:tick-circle-outline" />
          </IconButton>
          <IconButton
            disabled={status !== 'pending'}
            sx={{ color: 'error.main' }}
            onClick={() => handleOpenActionModal('reject')}
          >
            <Iconify icon="mdi:cross-circle-outline" />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  );
}

PuspaTableRow.propTypes = {
  id: PropTypes.number,
  user: PropTypes.string,
  amount: PropTypes.number,
  prev_balance: PropTypes.number,
  current_balance: PropTypes.number,
  status: PropTypes.string,
  view: PropTypes.string,
  trxId: PropTypes.string,
  updatedAt: PropTypes.string,
  openViewModal: PropTypes.func,
  openActionModal: PropTypes.func,
};
