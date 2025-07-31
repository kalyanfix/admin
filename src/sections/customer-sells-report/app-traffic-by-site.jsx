import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { red, grey, green } from '@mui/material/colors';

import { fShortenNumber } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function AppTrafficBySite({ title, subheader, list, ...other }) {
  const getTitle = (sTitle) => {
    if (sTitle === 'Single Digit' || sTitle === 'Right Digit' || sTitle === 'Left Digit') {
      return 'Digit';
    }
    if (sTitle === 'Double Digit'|| sTitle === 'Jodi Digit') {
      return 'Jodi';
    }
    if (sTitle === 'Single Panna' || sTitle === 'Double Panna' || sTitle === 'Triple Panna') {
      return 'Panna';
    }
    return '';
  };

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        sx={{ p: { xs: 1, sm: 2 }, typography: { xs: 'h6', sm: 'h5' } }}
      />

      <Box
        sx={{
          p: { xs: 1, sm: 2 },
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: 1.5,
          overflowX: 'auto',
          overflowY: 'auto',
        }}
      >
        {list.map((site) => (
          <Grid item xs={12} sm={6} md={4} key={site._id}>
            <Paper
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                borderStyle: 'dashed',
                backgroundColor: 'background.paper',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{ fontSize: { xs: 12, sm: 14 } }}
                  variant="body2"
                  color="text.secondary"
                >
                  {getTitle(title)}
                </Typography>
                {title !== 'Full Sangum' && title !== 'Half Sangum' && (
                  <Avatar
                    sx={{
                      mb: 0.5,
                      bgcolor: green[300],
                      color: grey[50],
                      width: { xs: 42, sm: 42 },
                      height: { xs: 32, sm: 32 },
                    }}
                    variant="rounded"
                  >
                    {site?._id}
                  </Avatar>
                )}
                {(title === 'Full Sangum' || title === 'Half Sangum') && (
                  <>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: { xs: 12, sm: 14 } }}
                      color="text.secondary"
                    >
                      {site?._id.split(',')[0].split(':')[0]}
                    </Typography>
                    <Avatar
                      sx={{
                        mb: 0.5,
                        bgcolor: green[300],
                        color: grey[50],
                        width: { xs: 42, sm: 42 },
                        height: { xs: 32, sm: 32 },
                      }}
                      variant="rounded"
                    >
                      {site?._id.split(',')[0].split(':')[1]}
                    </Avatar>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: { xs: 12, sm: 14 } }}
                      color="text.secondary"
                    >
                      {site?._id.split(',')[1].split(':')[0]}
                    </Typography>
                    <Avatar
                      sx={{
                        mb: 0.5,
                        bgcolor: green[300],
                        color: grey[50],
                        width: { xs: 42, sm: 42 },
                        height: { xs: 32, sm: 32 },
                      }}
                      variant="rounded"
                    >
                      {site?._id.split(',')[1].split(':')[1]}
                    </Avatar>
                  </>
                )}
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography
                  sx={{ fontSize: { xs: 12, sm: 14 } }}
                  variant="body2"
                  color="text.secondary"
                >
                  Points&nbsp;
                </Typography>
                <Avatar
                  sx={{
                    bgcolor: red[300],
                    color: grey[50],
                    mb: 1,
                    width: { xs: 42, sm: 42 },
                    height: { xs: 32, sm: 32 },
                  }}
                  variant="rounded"
                >
                  {fShortenNumber(site?.total_points)}
                </Avatar>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Box>
    </Card>
  );
}

AppTrafficBySite.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array,
};
