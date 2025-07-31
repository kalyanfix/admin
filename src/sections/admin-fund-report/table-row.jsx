import PropTypes from 'prop-types';

// import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { formatDate } from 'src/utils/format-time';
import { capitalizeString } from 'src/utils/format-string';

import Label from 'src/components/label';
// ----------------------------------------------------------------------

export default function PuspaTableRow({
  id,
  user,
  amount,
  prev_balance,
  current_balance,
  note,
  status,
  transfer_type,
  updatedAt,
}) {
  const getColor = (winData) => {
    if (winData === 'deposit' || winData === 'win') return 'success.main';
    if (winData === 'withdrawl' || winData === 'lose') return 'error.main';
    return '';
  };

  return (
    <TableRow hover>
      <TableCell>{id}</TableCell>
      <TableCell>{user}</TableCell>
      <TableCell>{amount}</TableCell>
      <TableCell>{note}</TableCell>
      <TableCell sx={{ color: getColor(transfer_type) }}>
        {capitalizeString(transfer_type)}
      </TableCell>
      <TableCell>{prev_balance}</TableCell>
      <TableCell>{current_balance}</TableCell>
      <TableCell>{formatDate(updatedAt)}</TableCell>
      <TableCell>
        <Label color={status === 'completed' ? 'success' : 'error'}>{status}</Label>
      </TableCell>
    </TableRow>
  );
}

PuspaTableRow.propTypes = {
  id: PropTypes.number,
  user: PropTypes.string,
  amount: PropTypes.number,
  prev_balance: PropTypes.number,
  current_balance: PropTypes.number,
  note: PropTypes.string,
  status: PropTypes.string,
  transfer_type: PropTypes.string,
  updatedAt: PropTypes.string,
};
