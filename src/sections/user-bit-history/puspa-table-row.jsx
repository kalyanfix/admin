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
  session,
  open_panna,
  open_digit,
  close_panna,
  close_digit,
  points,
  createdAt,
}) {
  return (
    <TableRow hover className="responsive-table">
      <TableCell data-label="User Name">{user_name}</TableCell>
      <TableCell data-label="Game Name">{market_name}</TableCell>
      <TableCell data-label="Game Type">{game_mode}</TableCell>
      <TableCell data-label="Session">{session}</TableCell>
      <TableCell data-label="Open Panna">{open_panna}</TableCell>
      <TableCell data-label="Open Digit">{open_digit}</TableCell>
      <TableCell data-label="Close Panna">{close_panna}</TableCell>
      <TableCell data-label="Close Digit">{close_digit}</TableCell>
      <TableCell data-label="Points">{points}</TableCell>
      <TableCell data-label="Date">{formatDate(createdAt)}</TableCell>
    </TableRow>
  );
}

PuspaTableRow.propTypes = {
  user_name: PropTypes.string,
  market_name: PropTypes.string,
  game_mode: PropTypes.string,
  session: PropTypes.string,
  open_panna: PropTypes.string,
  open_digit: PropTypes.string,
  close_panna: PropTypes.string,
  close_digit: PropTypes.string,
  points: PropTypes.string,
  createdAt: PropTypes.string,
};
