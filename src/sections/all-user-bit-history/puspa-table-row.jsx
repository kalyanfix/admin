import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { formatDate } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';

export default function PuspaTableRow({
  id,
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
  marketValue,
  win,
  openEditBetModal
}) {
  const getColor = (winData) => {
    if (winData === 'true') return 'success.main';
    if (winData === 'false') return 'error.main';
    return '';
  };

  return (
    <TableRow hover className="responsive-table">
      <TableCell data-label="User Name">{user_name}</TableCell>
      <TableCell data-label="Game Name" sx={{ color: getColor(win) }}>
        {market_name}
      </TableCell>
      <TableCell data-label="Game Type">{game_mode}</TableCell>
      {marketValue === 'main' && <TableCell data-label="Session">{session}</TableCell>}
      {marketValue !== 'galidisawar' && <TableCell data-label="Open Panna">{open_panna}</TableCell>}
      <TableCell data-label={marketValue === 'galidisawar' ? 'Left Digit' : 'Open Digit'}>
        {open_digit}
      </TableCell>
      {marketValue === 'main' && <TableCell data-label="Close Panna">{close_panna}</TableCell>}
      {marketValue === 'main' || marketValue === 'galidisawar' ? (
        <TableCell data-label={marketValue === 'galidisawar' ? 'Right Digit' : 'Close Digit'}>
          {close_digit}
        </TableCell>
      ) : null}
      <TableCell data-label="Points">{points}</TableCell>
      <TableCell data-label="Date">{formatDate(createdAt)}</TableCell>
      <TableCell data-label="Action" align="right">
          <IconButton
            sx={{ color: 'warning.main' }}
            onClick={() => {
              openEditBetModal({ id, open_panna, close_panna, open_digit, close_digit });
            }}
          >
            <Iconify icon="basil:edit-outline" />
          </IconButton>
        </TableCell>
    </TableRow>
  );
}

PuspaTableRow.propTypes = {
  id: PropTypes.string,
  user_name: PropTypes.string,
  market_name: PropTypes.string,
  game_mode: PropTypes.string,
  session: PropTypes.string,
  open_panna: PropTypes.string,
  open_digit: PropTypes.string,
  close_panna: PropTypes.string,
  close_digit: PropTypes.string,
  points: PropTypes.any,
  win: PropTypes.string,
  marketValue: PropTypes.string,
  createdAt: PropTypes.string,
  openEditBetModal: PropTypes.func,
};
