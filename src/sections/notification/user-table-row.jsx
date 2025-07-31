// import { useState } from 'react';
import PropTypes from 'prop-types';

// import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useAlert } from 'src/alert';
import { useApiNotificationCalls } from 'src/api/notificationApi';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

const baseUrl = import.meta.env.VITE_BASE_URL;

// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  title,
  body,
  img,
  link,
  users,
  all_user,
  status,
  handleToggle,
}) {
  const { handleSuccess, handleError } = useAlert();
  const { notificationSendApi, notificationToggleApi, notificationDeleteApi } =
    useApiNotificationCalls();

  // const [open, setOpen] = useState(null);

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setOpen(null);
  // };

  const handelToggle = async (noticeId) => {
    await notificationToggleApi({ id: noticeId })
      .then((responds) => {
        // console.log(responds.data);
        handleSuccess(responds ? responds?.message : 'Toggle successful');
        handleToggle();
      })
      .catch((err) => {
        handleError(err ? err?.message : 'Toggle Error');
      });
  };

  const handelDelete = async (sliderId) => {
    await notificationDeleteApi(sliderId)
      .then((responds) => {
        // console.log(responds.data);
        handleSuccess(responds ? responds?.message : 'Delete successful');
        handleToggle();
      })
      .catch((err) => {
        handleError(err ? err?.message : 'Delete Error');
      });
  };

  const handelSend = async (sliderId) => {
    await notificationSendApi(sliderId)
      .then((responds) => {
        // console.log(responds.data);
        handleSuccess(responds ? responds?.message : 'Send successful');
        handleToggle();
      })
      .catch((err) => {
        handleError(err ? err?.message : 'Send Error');
      });
  };

  // console.log(users.length)

  return (
    <>
      <TableRow hover className="responsive-table">
        <TableCell data-label="Title">{title}</TableCell>

        <TableCell data-label="Body">{body}</TableCell>

        <TableCell data-label="Img">
          <img
            src={`${baseUrl}api/v1/misc/images?type=notification&name=${img}`}
            alt={img}
            crossOrigin="anonymous"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/images/no-image.png';
            }}
            style={{ width: '100%', height: '10vh', maxHeight: '100vh', objectFit: 'contain' }}
          />
        </TableCell>

        <TableCell data-label="Link">{link}</TableCell>

        <TableCell data-label="No. of User">
          {all_user ? 'All User' : `${users.length} Users`}
        </TableCell>

        <TableCell data-label="Status">
          <Label
            onClick={() => handelToggle(id)}
            style={{ cursor: 'pointer' }}
            color={status ? 'success' : 'error'}
          >
            {status ? 'Active' : 'Deactive'}
          </Label>
        </TableCell>

        <TableCell align="right" data-label="Send">
          <IconButton sx={{ color: 'primary.main' }} onClick={() => handelSend(id)}>
            <Iconify icon="lets-icons:send-duotone" />
          </IconButton>
        </TableCell>

        <TableCell align="right" data-label="Delete">
          <IconButton sx={{ color: 'error.main' }} onClick={() => handelDelete(id)}>
            <Iconify icon="ant-design:delete-twotone" />
          </IconButton>
        </TableCell>

        {/* <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      {/* <Popover
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
      </Popover> */}
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  img: PropTypes.string,
  all_user: PropTypes.bool,
  users: PropTypes.array,
  link: PropTypes.string,
  status: PropTypes.any,
  handleToggle: PropTypes.func,
};
