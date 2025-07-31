import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { formatDate } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function PuspaTableRow({
  id,
  market_name,
  game_mode,
  session,
  open_panna,
  open_digit,
  close_panna,
  close_digit,
  win,
  points,
  winning_amount,
  createdAt,
  marketValue, // New prop for market value
  openEditBetModal,
}) {
  const getColor = (winData) => {
    if (winData === 'true') return 'success.main';
    if (winData === 'false') return 'error.main';
    return '';
  };

  return (
    <TableRow hover className="responsive-table">
      <TableCell data-label="Name" sx={{ color: getColor(win) }}>
        {market_name}
      </TableCell>
      <TableCell data-label="Mode">{game_mode}</TableCell>
      {marketValue === 'main' && <TableCell data-label="Session">{session}</TableCell>}

      {/* Conditionally render cells based on marketValue */}
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
      {winning_amount && <TableCell data-label="Win Points">{winning_amount}</TableCell>}
      <TableCell data-label="Date">{formatDate(createdAt)}</TableCell>
      {!winning_amount && <TableCell data-label="Action" align="right">
        <IconButton
          sx={{ color: 'warning.main' }}
          onClick={() => {
            openEditBetModal({ id, open_panna, close_panna, open_digit, close_digit });
          }}
        >
          <Iconify icon="basil:edit-outline" />
        </IconButton>
      </TableCell>}
    </TableRow>
  );
}

PuspaTableRow.propTypes = {
  market_name: PropTypes.string,
  id: PropTypes.string,
  game_mode: PropTypes.string,
  session: PropTypes.string,
  open_panna: PropTypes.string,
  open_digit: PropTypes.string,
  close_panna: PropTypes.string,
  close_digit: PropTypes.string,
  win: PropTypes.oneOf(['true', 'false', '']),
  points: PropTypes.any,
  winning_amount: PropTypes.any,
  createdAt: PropTypes.string,
  marketValue: PropTypes.string, // Add PropTypes for marketValue
  openEditBetModal: PropTypes.func,
};
