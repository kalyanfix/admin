import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import { useRef, useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { grey } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import Autocomplete from '@mui/material/Autocomplete';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { convertTime, formatResultDate, convertResultDateFormat } from 'src/utils/format-time';

import { useAlert } from 'src/alert';
import Loader from 'src/loader/loader'; // Import the generic Loader component
import { useApiResultCalls } from 'src/api/resultApi';
import { useApiSettingsCalls } from 'src/api/settingsApi';
import { fetchSettingNotification } from 'src/_mock/user_mng';
import { fullList, fetchMarkets, fetchBetResults, fetchResultMarkets } from 'src/_mock/market';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../result-table-row';
import UserTableHead from '../result-table-head';
import TableEmptyRows from '../table-empty-rows';
import PuspaModalView from '../modal/puspa-modal-view';
import UserTableToolbar from '../result-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function ResultPage() {
  const { handleSuccess, handleError } = useAlert();
  const { revartResultApi, marketStatusApi, declareResultApi } = useApiResultCalls();
  const { autoSendSettingsUpdateApi } = useApiSettingsCalls();

  const pannaInputRef = useRef(null); // Create a ref for Panna List Autocomplete

  const [state, setState] = useState({
    loading: false,
    markets: [],
    bidMarkets: [],
    isModalOpen: false,
    selectDate: dayjs(new Date()), // Initial date set to today's date
    marketStatus: '',
    resultData: [],
    selectTableDate: dayjs(new Date()),
    page: 0,
    order: 'asc',
    selected: [],
    orderBy: 'name',
    filterName: '',
    rowsPerPage: 10,
    bidRevart: {
      market_id: '',
      bid_date: formatResultDate(new Date()),
    },
    declareResultData: {
      market_id: '',
      session: '',
      result_date: formatResultDate(new Date()),
      bet_status: 'closed',
      tag: 'main',
      digit: '',
      panna: '',
    },
    resultListData: formatResultDate(new Date()),
  });

  const [pannaValue, setPannaValue] = useState(null);
  const [pannaInputValue, setPannaInputValue] = useState('');
  const [marketValue, setMarketValue] = useState(null);
  const [marketInputValue, setMarketInputValue] = useState('');

  const [bidMarketValue, setBidMarketValue] = useState(null);
  const [bidMmarketInputValue, setBidMarketInputValue] = useState('');

  const [autoSend, setAutoSend] = useState();

  const statusMap = useMemo(
    () => ({
      open: 'Open',
      close: 'Close',
      '-': 'End',
    }),
    []
  );

  const fetchResultData = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const resultList = await fetchBetResults(state.resultListData);
      setState((prevState) => ({ ...prevState, resultData: resultList }));
    } catch (err) {
      console.error(err);
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }, [state.resultListData]);

  const fetchMarketData = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const marketData = await fetchResultMarkets(state.declareResultData.result_date);
      const marketBidData = await fetchMarkets();

      setState((prevState) => ({
        ...prevState,
        markets: marketData.filter(
          (market) => market.market_status === true && market.status === true
        ),
        bidMarkets: marketBidData.filter((market) => market.status === true),
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }, [state.declareResultData.result_date]);

  useEffect(() => {
    fetchMarketData();
    fetchResultData();
  }, [fetchResultData, fetchMarketData]);

  const handleToggle = useCallback(() => {
    fetchMarketData();
    fetchBetResults(state.resultListData).then((resultList) => {
      setState((prevState) => ({ ...prevState, resultData: resultList }));
    });
  }, [state.resultListData, fetchMarketData]);

  const handleDelete = useCallback(() => {
    fetchMarketData();
    fetchBetResults(state.resultListData).then((resultList) => {
      setState((prevState) => ({ ...prevState, resultData: resultList }));
    });
  }, [state.resultListData, fetchMarketData]);

  const handleSort = useCallback(
    (event, id) => {
      const isAsc = state.orderBy === id && state.order === 'asc';
      setState((prevState) => ({
        ...prevState,
        order: isAsc ? 'desc' : 'asc',
        orderBy: id,
      }));
    },
    [state.order, state.orderBy]
  );

  const handleSelectAllClick = useCallback(
    (event) => {
      if (event.target.checked) {
        const newSelecteds = state.resultData.map((n) => n.name);
        setState((prevState) => ({ ...prevState, selected: newSelecteds }));
        return;
      }
      setState((prevState) => ({ ...prevState, selected: [] }));
    },
    [state.resultData]
  );

  const handleClick = useCallback(
    (event, name) => {
      const selectedIndex = state.selected.indexOf(name);
      let newSelected = [];
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(state.selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(state.selected.slice(1));
      } else if (selectedIndex === state.selected.length - 1) {
        newSelected = newSelected.concat(state.selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          state.selected.slice(0, selectedIndex),
          state.selected.slice(selectedIndex + 1)
        );
      }
      setState((prevState) => ({ ...prevState, selected: newSelected }));
    },
    [state.selected]
  );

  const handleChangePage = useCallback((event, newPage) => {
    setState((prevState) => ({ ...prevState, page: newPage }));
  }, []);

  const handleChangeRowsPerPage = useCallback((event) => {
    setState((prevState) => ({
      ...prevState,
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10),
    }));
  }, []);

  const handleFilterByName = useCallback((event) => {
    setState((prevState) => ({
      ...prevState,
      page: 0,
      filterName: event.target.value,
    }));
  }, []);

  const closeModal = useCallback(() => {
    setState((prevState) => ({ ...prevState, isModalOpen: false }));
  }, []);

  const handleDeclareResult = useCallback(async () => {
    try {
      const data = await declareResultApi(state.declareResultData);
      handleSuccess(data.message);

      // Reset the selectDate to today's date after the result is declared
      const today = dayjs(new Date());

      setState((prevState) => ({
        ...prevState,
        declareResultData: {
          market_id: '',
          session: '',
          result_date: formatResultDate(new Date()),
          bet_status: 'closed',
          tag: 'main',
          digit: '',
          panna: '',
        },
        marketStatus: '',
        selectDate: today, // Update selectDate to today's date
      }));
      setPannaValue(null);
      setPannaInputValue('');
      setMarketValue(null);
      setMarketInputValue('');
      fetchResultData();
      fetchMarketData();
    } catch (e) {
      handleError(e.response.data.message || 'Error occurred');
    }
  }, [
    state.declareResultData,
    handleError,
    handleSuccess,
    declareResultApi,
    fetchResultData,
    fetchMarketData,
  ]);

  const handleBidRevart = useCallback(async () => {
    try {
      const data = await revartResultApi({
        market_id: state.bidRevart.market_id,
        query_date: state.bidRevart.bid_date,
      });
      handleSuccess(data.message);
      setState((prevState) => ({
        ...prevState,
        bidRevart: {
          market_id: '',
          bid_date: formatResultDate(new Date()),
        },
      }));
      setPannaValue(null);
      setPannaInputValue('');
      setBidMarketValue(null);
      setBidMarketInputValue('');
      fetchMarketData();
    } catch (e) {
      handleError(e.response.data.message || 'Error occurred');
    }
  }, [state.bidRevart, handleError, handleSuccess, revartResultApi, fetchMarketData]);

  const handleTableDateSelect = useCallback((e) => {
    setState((prevState) => ({
      ...prevState,
      selectTableDate: e,
      resultListData: convertResultDateFormat(e.$d.toDateString()),
    }));
  }, []);

  const handleStatusChange = async (event, newStatus) => {
    if (newStatus !== null) {
      setAutoSend(newStatus);
      await autoSendSettingsUpdateApi()
        .then((d) => {
          handleSuccess(d ? d?.message : 'Toggle successful');
        })
        .catch((err) => {
          handleError(err ? err?.message : 'Toggle Error');
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSettings = await fetchSettingNotification();
        setAutoSend(userSettings ? 'active' : 'inactive');
      } catch (err) {
        // console.log(err);
      }
    };
    fetchData();
  }, [autoSend]);

  const dataFiltered = useMemo(
    () =>
      applyFilter({
        inputData: state.resultData,
        comparator: getComparator(state.order, state.orderBy),
        filterName: state.filterName,
      }),
    [state.resultData, state.order, state.orderBy, state.filterName]
  );

  const notFound = !!state.filterName;
  const noData = !dataFiltered.length;

  const isFormComplete = useMemo(() => {
    const { market_id, session, digit, panna } = state.declareResultData;
    return market_id && session && digit && panna;
  }, [state.declareResultData]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Result Declare</Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Auto Notification Send: &nbsp;&nbsp;&nbsp;</Typography>
          <ToggleButtonGroup
            value={autoSend}
            color={autoSend === 'active' ? 'success' : 'error'}
            exclusive
            onChange={handleStatusChange}
            aria-label="status"
          >
            <ToggleButton value="active" aria-label="active">
              <CheckIcon /> On
            </ToggleButton>
            <ToggleButton value="inactive" aria-label="inactive">
              <CloseIcon /> Off
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Stack>

      <Card
        component={Stack}
        spacing={3}
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          px: 3,
          py: 3,
          borderRadius: 2,
          my: 5,
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="space-evenly"
          sx={{ width: '100%' }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
            <DemoContainer
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '30%' },
                mb: { xs: 2, sm: 0 },
              }}
              components={['DatePicker']}
            >
              <DatePicker
                label="Result Date"
                value={state.selectDate} // Use value instead of defaultValue
                format="DD/MM/YYYY"
                onChange={(newValue) => {
                  setState((prevState) => ({
                    ...prevState,
                    selectDate: newValue,
                    declareResultData: {
                      ...prevState.declareResultData,
                      result_date: convertResultDateFormat(newValue.$d.toDateString()),
                    },
                  }));
                }}
                maxDate={dayjs()}
              />
            </DemoContainer>
          </LocalizationProvider>

          <Autocomplete
            value={marketValue}
            inputValue={marketInputValue}
            onChange={async (event, newValue) => {
              setMarketValue(newValue);
              if (newValue) {
                const res = await marketStatusApi({
                  query_date: state.declareResultData.result_date,
                  market_id: newValue.market_id,
                });
                setState((prevState) => ({
                  ...prevState,
                  marketStatus: res?.data,
                  declareResultData: {
                    ...prevState.declareResultData,
                    market_id: newValue.market_id,
                    session: res?.data,
                  },
                }));
                pannaInputRef.current.focus(); // Automatically shift focus to Panna List
              }
            }}
            onInputChange={(event, newInputValue) => {
              setMarketInputValue(newInputValue);
            }}
            freeSolo
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', sm: 440 },
              mb: { xs: 2, sm: 0 },
            }}
            id="free-solo-2-demo"
            disableClearable
            options={state.markets}
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

          <Avatar
            component="span"
            sx={{
              bgcolor: grey[200],
              color: grey[900],
              m: 1,
              width: { xs: '100%', sm: '180px' },
              mb: { xs: 2, sm: 0 },
            }}
            variant="rounded"
          >
            {statusMap[state.marketStatus] || '-'}
          </Avatar>
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="space-evenly"
          sx={{ width: '100%' }}
        >
          <Autocomplete
            // ref={pannaInputRef} // Add the ref here to focus later
            value={pannaValue}
            inputValue={pannaInputValue}
            onChange={(event, newValue) => {
              setPannaValue(newValue);
              if (newValue) {
                setState((prevState) => ({
                  ...prevState,
                  declareResultData: {
                    ...prevState.declareResultData,
                    panna: newValue.panna,
                    digit: newValue.digit,
                  },
                }));
              }
            }}
            onInputChange={(event, newInputValue) => {
              setPannaInputValue(newInputValue);
            }}
            freeSolo
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', sm: 300 },
              mb: { xs: 2, sm: 0 },
            }}
            id="free-solo-2-demo"
            disableClearable
            options={fullList}
            getOptionLabel={(option) => option.panna}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...props}
                key={option.panna}
              >
                {option.panna}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Panna List"
                inputRef={pannaInputRef} // Attach the ref to the input
              />
            )}
          />

          <Avatar
            component="span"
            sx={{
              bgcolor: grey[200],
              color: grey[900],
              m: 1,
              width: { xs: '100%', sm: '180px' },
              mb: { xs: 2, sm: 0 },
            }}
            variant="rounded"
          >
            {state.declareResultData.digit || '-'}
          </Avatar>

          <Button
            variant="contained"
            size="large"
            color="inherit"
            sx={{ mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
            onClick={handleDeclareResult}
            disabled={state.marketStatus === '-' || !isFormComplete}
          >
            Declare Result
          </Button>

          <Button
            variant="contained"
            size="large"
            color="inherit"
            sx={{ width: { xs: '100%', sm: 'auto' } }}
            onClick={() => setState((prevState) => ({ ...prevState, isModalOpen: true }))}
            disabled={state.marketStatus === '-' || !isFormComplete}
          >
            Show Winner
          </Button>
        </Stack>
      </Card>

      <Card
        component={Stack}
        spacing={3}
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          px: 3,
          py: 3,
          borderRadius: 2,
          my: 5,
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ width: '100%' }}>
          <Typography variant="h6">Bid-Revert</Typography>
        </Stack>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="space-evenly"
          sx={{ width: '100%' }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
            <DemoContainer
              sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '30%' },
                mb: { xs: 2, sm: 0 },
              }}
              components={['DatePicker']}
            >
              <DatePicker
                label="Result Date"
                defaultValue={state.selectDate}
                format="DD/MM/YYYY"
                onChange={(newValue) => {
                  setState((prevState) => ({
                    ...prevState,
                    selectDate: newValue,
                    bidRevart: {
                      ...prevState.bidRevart,
                      result_date: convertResultDateFormat(newValue.$d.toDateString()),
                    },
                  }));
                }}
                maxDate={dayjs()}
              />
            </DemoContainer>
          </LocalizationProvider>

          <Autocomplete
            value={bidMarketValue}
            inputValue={bidMmarketInputValue}
            onChange={async (event, newValue) => {
              setBidMarketValue(newValue);
              if (newValue) {
                setState((prevState) => ({
                  ...prevState,
                  bidRevart: {
                    ...prevState.bidRevart,
                    market_id: newValue.market_id,
                  },
                }));
              }
            }}
            onInputChange={(event, newInputValue) => {
              setBidMarketInputValue(newInputValue);
            }}
            freeSolo
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', sm: 440 },
              mb: { xs: 2, sm: 0 },
            }}
            id="free-solo-2-demo"
            disableClearable
            options={state.bidMarkets}
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

          <Button
            variant="contained"
            size="large"
            color="inherit"
            sx={{ mb: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
            onClick={handleBidRevart}
            disabled={state.bidRevart.market_id === ''}
          >
            Bid Revert
          </Button>
        </Stack>
      </Card>

      <Card>
        <UserTableToolbar
          numSelected={state.selected.length}
          filterName={state.filterName}
          selectTableDate={state.selectTableDate}
          handleTableDateSelect={handleTableDateSelect}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Loader isLoading={state.loading}>
              <Table className="responsive-table">
                <UserTableHead
                  order={state.order}
                  orderBy={state.orderBy}
                  rowCount={state.resultData.length}
                  numSelected={state.selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'id', label: '#' },
                    { id: 'market_name', label: 'Game Name' },
                    { id: 'to', label: 'Result Date' },
                    { id: 'open_declare', label: 'Open Declare Date' },
                    { id: 'close_declare', label: 'Close Declare Date' },
                    { id: 'open_result', label: 'Open Panna' },
                    { id: 'close_result', label: 'Close Panna' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(
                      state.page * state.rowsPerPage,
                      state.page * state.rowsPerPage + state.rowsPerPage
                    )
                    .map((row, index) => (
                      <UserTableRow
                        key={row._id}
                        id={index + 1}
                        result_id={row._id}
                        market_id={row?.market_id?._id}
                        market_name={row.market_name}
                        to={row.to}
                        open_declare={row.open_declare}
                        close_declare={row?.close_declare}
                        open_result={row.open_result}
                        close_result={row.close_result}
                        resultListData={state.resultListData}
                        selected={state.selected.indexOf(row.game) !== -1}
                        handleClick={(event) => handleClick(event, row.game)}
                        handleToggle={handleToggle}
                        handleDelete={handleDelete}
                      />
                    ))}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(state.page, state.rowsPerPage, state.resultData.length)}
                  />

                  {notFound && noData ? (
                    <TableNoData query={notFound ? state.filterName : undefined} />
                  ) : null}
                </TableBody>
              </Table>
            </Loader>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={state.page}
          component="div"
          count={state.resultData.length}
          rowsPerPage={state.rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <PuspaModalView
        isOpen={state.isModalOpen}
        onClose={closeModal}
        declareResultData={state.declareResultData}
      />
    </Container>
  );
}
