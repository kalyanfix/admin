import { useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';

import { formatDate } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({ id, name, mobile, message, createdAt }) {
  const [open, setOpen] = useState(null);

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const numberCopy = (mobileNumber) => {
    navigator.clipboard
      .writeText(mobileNumber)
      .then(() => {
        // console.log(`Copied ${mobileNumber} to clipboard`);
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  };

  const openWhatsapp = (mobileNumber) => {
    const whatsappUrl = `https://wa.me/${mobileNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  const openCall = (mobileNumber) => {
    const callUrl = `tel:${mobileNumber}`;
    window.location.href = callUrl;
  };  

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" className="responsive-table">
        <TableCell data-label="#">{id}</TableCell>
        <TableCell data-label="Name">{name}</TableCell>

        <TableCell data-label="Mobile">
          <span
            role="button"
            tabIndex="0"
            style={{ cursor: 'pointer' }}
            onClick={() => openCall(mobile)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                openCall(mobile);
              }
            }}
          >
            {mobile}
          </span>{' '}
          <span
            role="button"
            tabIndex="0"
            style={{ cursor: 'pointer' }}
            onClick={() => numberCopy(mobile)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                numberCopy(mobile);
              }
            }}
          >
            <Iconify icon="solar:copy-bold-duotone" />
          </span>{' '}
          <span
            role="button"
            tabIndex="0"
            style={{ cursor: 'pointer' }}
            onClick={() => openWhatsapp(mobile)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                openWhatsapp(mobile);
              }
            }}
          >
            <Iconify icon="ic:baseline-whatsapp" />
          </span>
        </TableCell>
        <TableCell data-label="Message">{message}</TableCell>
        <TableCell align="center" data-label="Date">
          {formatDate(createdAt)}
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.any,
  name: PropTypes.any,
  mobile: PropTypes.any,
  message: PropTypes.any,
  createdAt: PropTypes.any,
};
