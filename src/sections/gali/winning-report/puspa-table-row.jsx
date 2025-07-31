import PropTypes from 'prop-types';

// import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { formatDate } from 'src/utils/format-time';

// import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function PuspaTableRow({
  user_name,
  market_name,
  game_mode,
  open_digit,
  close_digit,
  points,
  createdAt,
}) {
  return (
    <TableRow hover>
      <TableCell>{user_name}</TableCell>
      <TableCell>{market_name}</TableCell>
      <TableCell>{game_mode}</TableCell>
      <TableCell>{open_digit}</TableCell>
      <TableCell>{close_digit}</TableCell>
      <TableCell>{points}</TableCell>
      <TableCell>{formatDate(createdAt)}</TableCell>
    </TableRow>
  );
}

PuspaTableRow.propTypes = {
  user_name: PropTypes.string,
  market_name: PropTypes.string,
  game_mode: PropTypes.string,
  open_digit: PropTypes.string,
  close_digit: PropTypes.string,
  points: PropTypes.string,
  createdAt: PropTypes.string,
};
