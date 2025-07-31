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
  type,
  trxId,
  updatedAt,
  openViewModal,
  openActionModal,
}) {
  const handleOpenViewModal = () => {
    openViewModal(user);
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
    <TableRow hover>
      <TableCell>{id}</TableCell>
      <TableCell>{capitalizeString(user?.user_name)}</TableCell>
      <TableCell>{amount}</TableCell>
      <TableCell>{prev_balance}</TableCell>
      <TableCell>{current_balance}</TableCell>
      <TableCell>
        <Label color={getStatusColor(status)}>{status}</Label>
      </TableCell>

      {type === 'mobile' && (
        <TableCell align="left">
          <IconButton sx={{ color: 'secondary.main' }} onClick={handleOpenViewModal}>
            <Iconify icon="noto:eye" />
          </IconButton>
        </TableCell>
      )}

      <TableCell>{formatDate(updatedAt)}</TableCell>

      {type === 'mobile' && (
        <TableCell align="left">
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
  user: PropTypes.object,
  amount: PropTypes.number,
  prev_balance: PropTypes.number,
  current_balance: PropTypes.number,
  status: PropTypes.string,
  type: PropTypes.string,
  trxId: PropTypes.string,
  updatedAt: PropTypes.string,
  openViewModal: PropTypes.func,
  openActionModal: PropTypes.func,
};
