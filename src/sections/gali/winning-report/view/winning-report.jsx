import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { convertTime, formatResultDate, convertResultDateFormat } from 'src/utils/format-time';

import { useAlert } from 'src/alert';
import { useApiBetCalls } from 'src/api/betApi';
import { fetchGaliMarkets } from 'src/_mock/market';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import PuspaTableRow from '../puspa-table-row';
import PuspaTableHead from '../puspa-table-head';
import PuspaTableNoData from '../puspa-table-no-data';
import PuspaTableToolbar from '../puspa-table-toolbar';
import PuspaTableEmptyRows from '../puspa-table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../utils';

export default function GaliWinningReportPage() {
  const todayDate = new Date();

  const { handleSuccess, handleError } = useAlert();
  const { bidHistoryApi } = useApiBetCalls();

  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const marketData = await fetchGaliMarkets(); // Fetch users from the function
        // console.log('marketData: ', marketData);
        setMarkets(marketData.filter((market) => market.market_status === true && market.status === true)); // Store the users in state
      } catch (err) {
        // console.log(err); // Store any error in state
      }
    };
    fetchData(); // API call when modal is closed
  }, []);

  const [declareResultData, setDeclareResultData] = useState({
    user_info: true,
    market_id: '',
    win: true,
    tag: 'galidisawar',
    query_date: formatResultDate(todayDate),
  });

  const [selectDate, setSelectDate] = useState(dayjs(todayDate));

  const [marketStatus, setMarketStatus] = useState('all');

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [declareResultListData, setDeclareResultListData] = useState([]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = declareResultListData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: declareResultListData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !!filterName;

  const noData = !dataFiltered.length;

  const handelBitHistory = async () => {
    // console.log(declareResultData);

    await bidHistoryApi(declareResultData)
      .then((res) => {
        handleSuccess(res?.message || 'Success');
        setDeclareResultListData(res?.data);
      })
      .catch((e) => {
        handleError(e.response.data.message || 'Error occurred');
      });
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4"> Gali-Di-Sawar Winning Report</Typography>

        {/* <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button> */}
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
            sx={{ width: '100%', maxWidth: { xs: '100%', sm: 250 }, mb: { xs: 2, sm: 0 } }}
          >
            <DatePicker
              label="Select Date"
              defaultValue={selectDate}
              format="DD/MM/YYYY"
              onChange={(newValue) => {
                setSelectDate(newValue);
                setDeclareResultData({
                  ...declareResultData,
                  query_date: convertResultDateFormat(newValue.$d.toDateString()),
                });
              }}
              maxDate={dayjs()}
            />
          </DemoContainer>
        </LocalizationProvider>

        <Autocomplete
          freeSolo
          sx={{ width: '100%', maxWidth: { xs: '100%', sm: 350 }, mb: { xs: 2, sm: 0 } }}
          id="free-solo-2-demo"
          disableClearable
          options={markets}
          onChange={async (event, newValue) => {
            if (newValue) {
              // console.log(newValue.market_id);
              setDeclareResultData({
                ...declareResultData,
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
              {option.title} ({convertTime(option.close_time)})
            </Box>
          )}
          renderInput={(params) => <TextField {...params} label="Market List" />}
        />

        <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: 200 }, mb: { xs: 2, sm: 0 } }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Game Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={marketStatus}
              label="Game Type"
              onChange={(newValue) => {
                setMarketStatus(newValue.target.value);
                setDeclareResultData({
                  ...declareResultData,
                  game_mode: newValue.target.value,
                });
              }}
            >
              <MenuItem value="all">All Type</MenuItem>
              <MenuItem value="left-digit">Left Digit</MenuItem>
              <MenuItem value="right-digit">Right Digit</MenuItem>
              <MenuItem value="jodi-digit">Jodi Digit</MenuItem>
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

      <Card>
        <PuspaTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <PuspaTableHead
                order={order}
                orderBy={orderBy}
                rowCount={declareResultListData.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'user_name', label: 'User Name' },
                  { id: 'market_name', label: 'Game Name' },
                  { id: 'game_mode', label: 'Game Type' },
                  { id: 'open_digit', label: 'Left Digit' },
                  { id: 'close_digit', label: 'Right Digit' },
                  { id: 'points', label: 'Points' },
                  { id: 'createdAt', label: 'Created At' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <PuspaTableRow
                      key={row.id}
                      user_name={row?.user_id?.user_name}
                      market_name={row?.market_name}
                      game_mode={row.game_mode}
                      open_digit={row.open_digit}
                      close_digit={row.close_digit}
                      points={row.points}
                      createdAt={row.createdAt}
                    />
                  ))}

                <PuspaTableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, declareResultListData.length)}
                />

                {notFound && noData ? (
                  <PuspaTableNoData query={notFound ? filterName : undefined} />
                ) : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={declareResultListData.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
