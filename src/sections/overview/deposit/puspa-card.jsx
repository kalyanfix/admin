import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { decrypt } from 'src/utils/enDec';
import { fDate } from 'src/utils/format-time';
import { fCurrency, fShortenNumber } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export default function PuspaCard({
  userData,
  openMpinModal,
  openAddModal,
  openWithdrawModal,
}) {
  // console.log('userData: ', userData);
  const { mobile, wallet, user_name, createdAt, updatedAt } = userData;

  const renderAvatar = (
    <Avatar
      alt={user_name}
      src={`/assets/images/avatars/avatar_${1}.jpg`}
      sx={{
        zIndex: 9,
        width: 32,
        height: 32,
        position: 'absolute',
        left: (theme) => theme.spacing(3),
        bottom: (theme) => theme.spacing(-2),
      }}
    />
  );

  const renderInformation = (
    <Grid container sx={{ p: 4 }} spacing={3}>
      <Grid xs={12} sm={4}>
        <Typography variant="h6">User Information</Typography>
        <Typography>
          Full Name: {userData.user_name === '-' ? 'N/A' : userData.user_name}
        </Typography>
        <Typography>Mobile: {userData.mobile === '-' ? 'N/A' : userData.mobile}</Typography>
        <Typography>Wallet: {fShortenNumber(userData.wallet)}</Typography>
        <Typography>Verified: {userData.verified ? 'Yes' : 'No'}</Typography>
        <Typography>Status: {userData.status ? 'Active' : 'Inactive'}</Typography>
        <Typography>Betting: {userData.betting ? 'Enabled' : 'Disabled'}</Typography>
      </Grid>
      <Grid xs={12} sm={4}>
        <Typography variant="h6">Address Information</Typography>
        <Typography>House No: {userData.house_no === '-' ? 'N/A' : userData.house_no}</Typography>
        <Typography>
          Address Lane 1: {userData.address_lane_1 === '-' ? 'N/A' : userData.address_lane_1}
        </Typography>
        <Typography>
          Address Lane 2: {userData.address_lane_2 === '-' ? 'N/A' : userData.address_lane_2}
        </Typography>
        <Typography>Area: {userData.area === '-' ? 'N/A' : userData.area}</Typography>
        <Typography>Pin Code: {userData.pin_code === '-' ? 'N/A' : userData.pin_code}</Typography>
        <Typography>State ID: {userData.state_id === '-' ? 'N/A' : userData.state_id}</Typography>
        <Typography>
          District ID: {userData.district_id === '-' ? 'N/A' : userData.district_id}
        </Typography>
      </Grid>
      <Grid xs={12} sm={4}>
        <Typography variant="h6">Payment Information</Typography>
        <Typography>UPI Id: {userData.upi_id === '-' ? 'N/A' : userData.upi_id}</Typography>
        <Typography>
          UPI Number: {userData.upi_number === '-' ? 'N/A' : userData.upi_number}
        </Typography>
        <Typography>
          Branch Name: {userData.branch_name === '-' ? 'N/A' : userData.upi_number}
        </Typography>
        <Typography>
          Bank Name: {userData.bank_name === '-' ? 'N/A' : userData.upi_number}
        </Typography>
        <Typography>Address: {userData.address === '-' ? 'N/A' : userData.upi_number}</Typography>
      </Grid>
    </Grid>
  );

  const renderTitle = (
    <Grid container spacing={3}>
      <Grid
        container
        sx={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}
        xs={12}
        sm={6}
      >
        <Typography variant="h6">Security MPIN: </Typography>
        <Typography variant="h3">{decrypt(userData.mpin, 10)}</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            openMpinModal();
          }}
        >
          Change MPIN
        </Button>
      </Grid>
      <Grid
        container
        sx={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}
        xs={12}
        sm={6}
      >
        <Typography variant="h6">Available Balance</Typography>
        <Typography variant="h3">₹ {fCurrency(userData.wallet)}</Typography>
        <Grid
          container
          spacing={3}
          sx={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}
          xs={12}
          sm={6}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              openAddModal();
            }}
          >
            Add Fund
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              openWithdrawModal();
            }}
          >
            Withdraw Fund
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );

  const renderInfo = (
    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={1.5}
      justifyContent="flex-end"
      sx={{
        mt: 3,
        color: 'text.disabled',
      }}
    >
      {[
        { number: wallet, icon: 'solar:wallet-bold-duotone' },
        { number: mobile, icon: 'fontisto:mobile' },
        { number: wallet, icon: 'solar:wallet-bold-duotone' },
      ].map((info, _index) => (
        <Stack key={_index} direction="row">
          <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
          {typeof info.number === 'number' && (
            <Typography variant="caption">{fShortenNumber(info.number)}</Typography>
          )}
        </Stack>
      ))}
    </Stack>
  );

  const renderCover = (
    <Box
      component="img"
      alt="Tesla Cybertruck-inspired camper trailer for Tesla fans who can’t just wait for the truck!"
      src={`/assets/images/covers/cover_${1}.jpg`}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderDate = (
    <Typography
      variant="caption"
      component="div"
      sx={{
        mb: 2,
      }}
    >
      Creation Date: {fDate(createdAt)}
      <br />
      Last Seen : {fDate(updatedAt)}
    </Typography>
  );

  const renderShape = (
    <SvgColor
      color="paper"
      src="/assets/icons/shape-avatar.svg"
      sx={{
        width: 80,
        height: 36,
        zIndex: 9,
        bottom: -15,
        position: 'absolute',
        color: 'background.paper',
      }}
    />
  );

  return (
    <Grid xs={12} sm={12} md={12}>
      <Scrollbar>
        <Card>
          <Box
            sx={{
              position: 'relative',
              height: 100,
            }}
          >
            {renderShape}

            {renderAvatar}

            {renderCover}
          </Box>

          <Box
            sx={{
              p: (theme) => theme.spacing(4, 3, 3, 3),
            }}
          >
            {renderDate}

            {renderTitle}

            {renderInformation}

            {renderInfo}
          </Box>
        </Card>
      </Scrollbar>
    </Grid>
  );
}

PuspaCard.propTypes = {
  userData: PropTypes.object,
  openMpinModal: PropTypes.func,
  openAddModal: PropTypes.func,
  openWithdrawModal: PropTypes.func,
};
