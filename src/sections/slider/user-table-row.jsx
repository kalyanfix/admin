// import { useState } from 'react';
import PropTypes from 'prop-types';

// import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useAlert } from 'src/alert';
import { useApiSliderCalls } from 'src/api/sliderApi';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

const baseUrl = import.meta.env.VITE_BASE_URL;

// ----------------------------------------------------------------------

export default function UserTableRow({ id, title, body, img, link, status, handleToggle, num }) {
  const { handleSuccess, handleError } = useAlert();
  const { sliderToggleApi, sliderDeleteApi } = useApiSliderCalls();

  // const [open, setOpen] = useState(null);

  // const handleOpenMenu = (event) => {
  //   setOpen(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setOpen(null);
  // };

  const handelToggle = async (sliderId) => {
    await sliderToggleApi(sliderId)
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
    await sliderDeleteApi(sliderId)
      .then((responds) => {
        // console.log(responds.data);
        handleSuccess(responds ? responds?.message : 'Toggle successful');
        handleToggle();
      })
      .catch((err) => {
        handleError(err ? err?.message : 'Toggle Error');
      });
  };

  return (
    <>
      <TableRow hover>
        <TableCell>{num}</TableCell>

        <TableCell>
          <img
            srcSet={`${baseUrl}api/v1/misc/images?type=slider&name=${img}`}
            src={`${baseUrl}api/v1/misc/images?type=slider&name=${img}`}
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

        <TableCell>
          <Label
            onClick={() => handelToggle(id)}
            style={{ cursor: 'pointer' }}
            color={status ? 'success' : 'error'}
          >
            {status ? 'Active' : 'Deactive'}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton sx={{ color: 'error.main' }} onClick={() => handelDelete(id)}>
            <Iconify icon="ant-design:delete-twotone" />
          </IconButton>
        </TableCell>
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
  num: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  img: PropTypes.string,
  link: PropTypes.string,
  status: PropTypes.any,
  handleToggle: PropTypes.func,
};
