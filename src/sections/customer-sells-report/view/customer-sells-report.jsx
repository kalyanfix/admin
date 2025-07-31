import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import html2canvas from 'html2canvas';
import React, { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import { red, grey, green } from '@mui/material/colors';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { convertTime, formatResultDate, convertResultDateFormat } from 'src/utils/format-time';

import { useAlert } from 'src/alert';
import { useApiBetCalls } from 'src/api/betApi';
import { fetchMarkets } from 'src/_mock/market';

import Iconify from 'src/components/iconify';
// import Scrollbar from 'src/components/scrollbar';

import AppTrafficBySite from '../app-traffic-by-site';

export default function CustomerSellsReportPage() {
  const todayDate = new Date();
  const { handleSuccess, handleError } = useAlert();
  const { bidPointHistoryApi } = useApiBetCalls();
  const [markets, setMarkets] = useState([]);
  const [marketStatus, setMarketStatus] = useState('all');
  const [sellReportData, setSellReportData] = useState({
    market_id: '',
    session: 'open',
    tag: 'main',
    query_date: formatResultDate(todayDate),
  });
  const [selectDate, setSelectDate] = useState(dayjs(todayDate));
  const [sellReportListData, setSellReportListData] = useState([]);
  const reportRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const marketData = await fetchMarkets();
        // console.log('marketData: ', marketData);
        setMarkets(marketData.filter((market) => market.market_status === true && market.status === true));
      } catch (err) {
        // console.log(err);
      }
    };
    fetchData();
  }, []);

  const handelBitHistory = async () => {
    // console.log(sellReportData);
    await bidPointHistoryApi(sellReportData)
      .then((res) => {
        handleSuccess(res?.message || 'Success');
        setSellReportListData(res.data);
        // console.log('sellReportListData: ', res.data);
      })
      .catch((e) => {
        handleError(e.response.data.message || 'Error occurred');
      });
  };

  const downloadReportAsImage = async () => {
    if (reportRef.current) {
      const canvas = await html2canvas(reportRef.current);
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `CustomerSellsReport_${dayjs().format('YYYY-MM-DD')}.png`;
      link.click();
    }
  };

  const categories = [
    { key: 'single-digit', title: 'Single Digit' },
    { key: 'double-digit', title: 'Double Digit' },
    { key: 'single-panna', title: 'Single Panna' },
    { key: 'double-panna', title: 'Double Panna' },
    { key: 'triple-panna', title: 'Triple Panna' },
    { key: 'full-sangum', title: 'Full Sangum' },
    { key: 'half-sangum', title: 'Half Sangum' },
  ];

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Customer Sells Report</Typography>
        <Button variant="contained" size="large" color="primary" onClick={downloadReportAsImage}>
          Download as Image
        </Button>
      </Stack>

      <Card
        component={Stack}
        spacing={3}
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          px: 3,
          py: 3,
          borderRadius: 2,
          my: 5,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
          <DemoContainer
            components={['DatePicker']}
            sx={{ width: '100%', maxWidth: { xs: '100%', sm: 200 }, mb: { xs: 2, sm: 0 } }}
          >
            <DatePicker
              label="Select Date"
              defaultValue={selectDate}
              format="DD/MM/YYYY"
              onChange={(newValue) => {
                setSelectDate(newValue);
                setSellReportData({
                  ...sellReportData,
                  query_date: convertResultDateFormat(newValue.$d.toDateString()),
                });
              }}
              maxDate={dayjs()}
            />
          </DemoContainer>
        </LocalizationProvider>

        <Autocomplete
          freeSolo
          sx={{ width: '100%', maxWidth: { xs: '100%', sm: 350 }, mb: { xs: 2, sm: 2 } }}
          id="free-solo-2-demo"
          disableClearable
          options={markets}
          onChange={async (event, newValue) => {
            if (newValue) {
              // console.log(newValue.market_id);
              setSellReportData({
                ...sellReportData,
                market_id: newValue.market_id,
              });
            }
          }}
          getOptionLabel={(option) => option.title}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              {...props}
              key={option.id}
            >
              {option.title} ({convertTime(option.open_time)} - {convertTime(option.close_time)})
            </Box>
          )}
          renderInput={(params) => <TextField {...params} label="Market List" />}
        />

        <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: 180 }, mb: { xs: 2, sm: 2 } }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Game Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={marketStatus}
              label="Game Type"
              onChange={(event) => {
                const { value } = event.target;
                setMarketStatus(event.target.value);
                setSellReportData((prevData) => {
                  if (value === 'all') {
                    // eslint-disable-next-line no-unused-vars
                    const { game_mode, ...rest } = prevData;
                    return rest;
                  }
                  return { ...prevData, game_mode: value };
                });
              }}
            >
              <MenuItem value="all">All Type</MenuItem>
              <MenuItem value="single-digit">Single Digit</MenuItem>
              <MenuItem value="double-digit">Double Digit</MenuItem>
              <MenuItem value="single-panna">Single Panna</MenuItem>
              <MenuItem value="double-panna">Double Panna</MenuItem>
              <MenuItem value="triple-panna">Triple Panna</MenuItem>
              <MenuItem value="half-sangum">Half Sangum</MenuItem>
              <MenuItem value="full-sangum">Full Sangum</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: 100 }, mb: { xs: 2, sm: 2 } }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Game Session</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sellReportData.session}
              label="Game Session"
              onChange={(newValue) => {
                setSellReportData({
                  ...sellReportData,
                  session: newValue.target.value,
                });
              }}
            >
              <MenuItem value="">Select Session</MenuItem>
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="close">Close</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          variant="contained"
          size="large"
          color="inherit"
          sx={{ mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
          endIcon={<Iconify icon="maki:arrow" />}
          onClick={(e) => {
            handelBitHistory();
          }}
        >
          Go
        </Button>
      </Card>

      <Card
        component={Stack}
        flexDirection={{ xs: 'row', sm: 'row' }}
        alignItems="center"
        justifyContent="space-evenly"
        sx={{
          px: 0.3,
          py: 0.3,
          borderRadius: 2,
          my: 0.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 3 }}>
          <Typography variant="h6" color="text.secondary">
            Digit: &nbsp;
          </Typography>
          <Avatar sx={{ bgcolor: green[300], color: grey[50] }} variant="rounded">
            XX
          </Avatar>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', py: 3 }}>
          <Typography variant="h6" color="text.secondary">
            Points: &nbsp;
          </Typography>
          <Avatar sx={{ bgcolor: red[300], color: grey[50] }} variant="rounded">
            XX
          </Avatar>
        </Box>
      </Card>

      <Card>
        <Box
          sx={{
            overflowX: 'auto',
            overflowY: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        >
          <div ref={reportRef}>
            {sellReportListData &&
            categories.some((category) => sellReportListData[category.key]?.length > 0) ? (
              categories.map(
                (category) =>
                  sellReportListData[category.key]?.length > 0 && (
                    <AppTrafficBySite
                      key={category.key}
                      title={category.title}
                      list={sellReportListData[category.key]}
                    />
                  )
              )
            ) : (
              <Stack sx={{ textAlign: 'center' }}>
                <Typography sx={{ padding: 2 }}>No data available.</Typography>
                <Box
                  component="img"
                  src="/assets/illustrations/illustration_404.svg"
                  sx={{
                    mx: 'auto',
                    height: 260,
                    my: { xs: 1, sm: 2 },
                  }}
                />
              </Stack>
            )}
          </div>
        </Box>
      </Card>
    </Container>
  );
}
