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
    <TableRow hover tabIndex={-1} role="checkbox" className="responsive-table
    ">
      <TableCell data-label="#">{id}</TableCell>
      <TableCell data-label="Ammount">{amount}</TableCell>
      <TableCell data-label="Type">{note}</TableCell>
      <TableCell data-label="Note">
        <Label color={status === 'completed' ? 'success' : 'error'}>{status}</Label>
      </TableCell>
      <TableCell data-label="Status" sx={{ color: getColor(transfer_type) }}>
        {capitalizeString(transfer_type)}
      </TableCell>
      <TableCell data-label="Prev. Balance">{prev_balance}</TableCell>
      <TableCell data-label="Balance">{current_balance}</TableCell>
      <TableCell data-label="Date">{formatDate(updatedAt)}</TableCell>
    </TableRow>
  );
}

PuspaTableRow.propTypes = {
  id: PropTypes.string,
  amount: PropTypes.any,
  prev_balance: PropTypes.any,
  current_balance: PropTypes.any,
  note: PropTypes.string,
  status: PropTypes.string,
  transfer_type: PropTypes.string,
  updatedAt: PropTypes.string,
};
