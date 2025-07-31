import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { useTheme, useMediaQuery } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

import Iconify from 'src/components/iconify';

// import Searchbar from './common/searchbar';
import { NAV, HEADER } from './config-layout';
import AccountPopover from './common/account-popover';
// import LanguagePopover from './common/language-popover';
// import NotificationsPopover from './common/notifications-popover';

// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const lgUp = useResponsive('up', 'lg');

  const handleRoute = (data) => {
    navigate(data);
  };

  const handleKeyDown = (event, path) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleRoute(path);
    }
  };

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      {/* <Searchbar /> */}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        <Button
          variant="outlined"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: isMobile ? '5px' : '0',
            width: isMobile ? '70px' : '200px',
            fontSize: isMobile ? '12px' : '16px',
          }}
        >
          <div
            style={{
              flex: 1,
              padding: isMobile ? '5px' : '10px',
              textAlign: 'center',
              borderRight: '1px solid #ccc',
            }}
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              handleRoute('/result');
            }}
            onKeyDown={(e) => handleKeyDown(e, '/result')}
          >
            Main
          </div>
          <div
            style={{
              flex: 1,
              padding: isMobile ? '5px' : '10px',
              textAlign: 'center',
            }}
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              handleRoute('/report/customer-sell-report');
            }}
            onKeyDown={(e) => handleKeyDown(e, '/report/customer-sell-report')}
          >
            R
          </div>
        </Button>

        <Button
          variant="outlined"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: isMobile ? '5px' : '0',
            width: isMobile ? '70px' : '200px',
            fontSize: isMobile ? '12px' : '16px',
          }}
        >
          <div
            style={{
              flex: 1,
              padding: isMobile ? '5px' : '10px',
              textAlign: 'center',
              borderRight: '1px solid #ccc',
            }}
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              handleRoute('/starline/declare-result');
            }}
            onKeyDown={(e) => handleKeyDown(e, '/starline/declare-result')}
          >
            {isMobile ? 'Star' : 'Starline'}
          </div>
          <div
            style={{
              flex: 1,
              padding: isMobile ? '5px' : '10px',
              textAlign: 'center',
            }}
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              handleRoute('/starline/starline-sell-report');
            }}
            onKeyDown={(e) => handleKeyDown(e, '/starline/starline-sell-report')}
          >
            R
          </div>
        </Button>

        <Button
          variant="outlined"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: isMobile ? '5px' : '0',
            width: isMobile ? '70px' : '200px',
            fontSize: isMobile ? '12px' : '16px',
          }}
        >
          <div
            style={{
              flex: 1,
              padding: isMobile ? '5px' : '10px',
              textAlign: 'center',
              borderRight: '1px solid #ccc',
            }}
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              handleRoute('/gali/declare-result');
            }}
            onKeyDown={(e) => handleKeyDown(e, '/gali/declare-result')}
          >
            {isMobile ? 'Dis' : 'Disawar'}
          </div>
          <div
            style={{
              flex: 1,
              padding: isMobile ? '5px' : '10px',
              textAlign: 'center',
            }}
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              handleRoute('/gali/gali-sell-report');
            }}
            onKeyDown={(e) => handleKeyDown(e, '/gali/gali-sell-report')}
          >
            R
          </div>
        </Button>

        {/* Uncomment if needed */}
        {/* <LanguagePopover /> */}
        {/* <NotificationsPopover /> */}
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
