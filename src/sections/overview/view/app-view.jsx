import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import TabList from '@mui/lab/TabList';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TabPanel from '@mui/lab/TabPanel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import TableBody from '@mui/material/TableBody';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { fCurrency } from 'src/utils/format-number';

import { useAlert } from 'src/alert';
import Loader from 'src/loader/loader';
import { fetchMarkets } from 'src/_mock/movie';
import { useApiBetCalls } from 'src/api/betApi';
import { dashboardApi } from 'src/apis/dashboardApi';
import { transactionHistoryApi } from 'src/apis/transactionApi';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import AppWidgetSummary from '../app-widget-summary';
import PuspaTableRow from '../deposit/puspa-table-row';
import PuspaTableHead from '../deposit/puspa-table-head';
import Puspa2TableRow from '../withdrawl/puspa-table-row';
import PuspaModalView from '../dep-modal/puspa-modal-view';
import Puspa2TableHead from '../withdrawl/puspa-table-head';
import Puspa2ModalView from '../with-modal/puspa-modal-view';
import PuspaTableNoData from '../deposit/puspa-table-no-data';
import PuspaTableToolbar from '../deposit/puspa-table-toolbar';
import PuspaModalAction from '../dep-modal/puspa-modal-action';
import Puspa2ModalAction from '../with-modal/puspa-modal-action';
import Puspa2TableNoData from '../withdrawl/puspa-table-no-data';
import Puspa2TableToolbar from '../withdrawl/puspa-table-toolbar';
import PuspaTableEmptyRows from '../deposit/puspa-table-empty-rows';
import Puspa2TableEmptyRows from '../withdrawl/puspa-table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../withdrawl/utils';

// import { emptyRows, applyFilter, getComparator } from '../deposit/utils';

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return `Date ${new Date(date).toLocaleDateString('en-US', options)}`;
};

// ----------------------------------------------------------------------

export default function AppView() {
  const [value, setValue] = useState('1');
  const [todayDate, setTodayDate] = useState('');

  useEffect(() => {
    const today = new Date();
    setTodayDate(formatDate(today));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  const { handleSuccess, handleError } = useAlert();
  const { ankListApi } = useApiBetCalls();

  const [markets, setMarkets] = useState([]);
  const [allData, setAllData] = useState([]);
  const [allAnkData, setAllAnkData] = useState([
    { _id: '0', total_points: 0 },
    { _id: '1', total_points: 0 },
    { _id: '2', total_points: 0 },
    { _id: '3', total_points: 0 },
    { _id: '4', total_points: 0 },
    { _id: '5', total_points: 0 },
    { _id: '6', total_points: 0 },
    { _id: '7', total_points: 0 },
    { _id: '8', total_points: 0 },
    { _id: '9', total_points: 0 },
  ]);

  const [formData, setFormData] = useState({
    market_id: '',
    session: 'open',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const marketData = await fetchMarkets();
        // console.log('marketData: ', marketData);
        setMarkets(marketData);
      } catch (err) {
        // console.log(err);
      }
    };

    const fetchAllData = async () => {
      try {
        const allDashData = await dashboardApi();
        // console.log('marketData: ', allDashData);
        setAllData(allDashData);
      } catch (err) {
        // console.log(err);
      }
    };

    fetchData();
    fetchAllData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handelAnk = async () => {
    // Function implementation needed
    // console.log(formData);

    await ankListApi(formData)
      .then((res) => {
        handleSuccess(res?.message || 'Success');
        // Merge the response data with the existing allAnkData
        // console.log('allAnkData', allAnkData);

        // If response data is empty, set all total_points to 0
        const updatedData = res.data.length
          ? allAnkData.map((ank) => {
              const newData = res.data.find((item) => item._id === ank._id);
              return newData ? { ...ank, total_points: newData.total_points } : ank;
            })
          : allAnkData.map((ank) => ({ ...ank, total_points: 0 }));

        setAllAnkData(updatedData);
        // console.log('Updated allAnkData: ', updatedData);
      })
      .catch((e) => {
        handleError(e.response.data.message || 'Error occurred');
      });
  };

  const handleRoute = (data) => {
    navigate(data);
  };

  // ================================= Table Data ===============================

  const [loading, setLoading] = useState(false);

  // ===================================== Withdrawl Modal Work =========================

  const [isWithViewModalOpen, setIsWithViewModalOpen] = useState(false);
  const [isWithActionModalOpen, setIsWithActionModalOpen] = useState(false);

  const [viewWithData, setViewWithData] = useState();
  const [actionWithData, setActionWithData] = useState('');

  const openWithViewModal = (data) => {
    setViewWithData(data);
    setIsWithViewModalOpen(true);
  };

  const closeWithViewModal = () => {
    setIsWithViewModalOpen(false);
  };

  const openWithActionModal = (data) => {
    setActionWithData(data);
    setIsWithActionModalOpen(true);
  };

  const closeWithActionModal = () => {
    setIsWithActionModalOpen(false);
  };

  // ===================================== Deposit Modal Work =========================

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);

  const [viewData, setViewData] = useState('');
  const [actionData, setActionData] = useState('');

  const openViewModal = (data) => {
    setViewData(data);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
  };

  const openActionModal = (data) => {
    setActionData(data);
    setIsActionModalOpen(true);
  };

  const closeActionModal = () => {
    setIsActionModalOpen(false);
  };

  // ===================================== Withdrawl History =========================

  const [userBetData, setUserBetData] = useState([]);
  const [pageBet, setPageBet] = useState(0);
  const [orderBet, setOrderBet] = useState('asc');
  const [selectedBet, setSelectedBet] = useState([]);
  const [orderByBet, setOrderByBet] = useState('name');
  const [filterBetName, setFilterBetName] = useState('');
  const [rowsPerBetPage, setRowsPerBetPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Call the API function with the desired data
        const result = await transactionHistoryApi({
          type: 'mobile',
          transfer_type: 'withdrawl',
          status: 'pending',
        });
        setUserBetData(result?.data); // Assuming the API returns an object with a 'data' property
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    if (!isWithActionModalOpen) {
      fetchData(); // API call when modal is closed
    }
  }, [isWithActionModalOpen]); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  const handleBetSort = (event, id) => {
    const isAsc = orderByBet === id && orderBet === 'asc';
    if (id !== '') {
      setOrderBet(isAsc ? 'desc' : 'asc');
      setOrderByBet(id);
    }
  };

  const handleBetSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userBetData.map((n) => n.name);
      setSelectedBet(newSelecteds);
      return;
    }
    setSelectedBet([]);
  };

  const handleBetChangePage = (event, newPage) => {
    setPageBet(newPage);
  };

  const handleBetChangeRowsPerPage = (event) => {
    setPageBet(0);
    setRowsPerBetPage(parseInt(event.target.value, 10));
  };

  const handleBetFilterByName = (event) => {
    setPageBet(0);
    setFilterBetName(event.target.value);
  };

  const dataBetFiltered = applyFilter({
    inputData: userBetData,
    comparator: getComparator(orderBet, orderByBet),
    filterBetName,
  });

  const notBetFound = !!filterBetName;
  const noBetData = !dataBetFiltered.length;

  // ===================================== Deposit History =========================

  const [userDepData, setUserDepData] = useState([]);
  const [pageDep, setPageDep] = useState(0);
  const [orderDep, setOrderDep] = useState('asc');
  const [selectedDep, setSelectedDep] = useState([]);
  const [orderByDep, setOrderByDep] = useState('name');
  const [filterDepName, setFilterDepName] = useState('');
  const [rowsPerDepPage, setRowsPerDepPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Call the API function with the desired data
        const result = await transactionHistoryApi({
          type: 'mobile',
          transfer_type: 'deposit',
          status: 'pending',
        });
        setUserDepData(result?.data); // Assuming the API returns an object with a 'data' property
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    if (!isActionModalOpen) {
      fetchData(); // API call when modal is closed
    }
  }, [isActionModalOpen]); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  const handleDepSort = (event, id) => {
    const isAsc = orderByDep === id && orderDep === 'asc';
    if (id !== '') {
      setOrderDep(isAsc ? 'desc' : 'asc');
      setOrderByDep(id);
    }
  };

  const handleDepSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userDepData.map((n) => n.name);
      setSelectedDep(newSelecteds);
      return;
    }
    setSelectedDep([]);
  };

  const handleDepChangePage = (event, newPage) => {
    setPageDep(newPage);
  };

  const handleDepChangeRowsPerPage = (event) => {
    setPageDep(0);
    setRowsPerDepPage(parseInt(event.target.value, 10));
  };

  const handleDepFilterByName = (event) => {
    setPageDep(0);
    setFilterDepName(event.target.value);
  };

  const dataDepFiltered = applyFilter({
    inputData: userDepData,
    comparator: getComparator(orderDep, orderByDep),
    filterDepName,
  });

  const notDepFound = !!filterDepName;
  const noDepData = !dataDepFiltered.length;

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid
          xs={12}
          sx={{ cursor: 'pointer' }}
          sm={6}
          md={4}
          onClick={() => handleRoute('/user/all')}
        >
          <AppWidgetSummary
            title="Total Users"
            total={allData?.allUsers}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users_1.png" />}
          />
        </Grid>

        <Grid xs={12} sx={{ cursor: 'pointer' }} sm={6} md={4}>
          <AppWidgetSummary
            title="Games"
            total={allData?.allMarkets}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_games_1.png" />}
          />
        </Grid>

        <Grid xs={12} sx={{ cursor: 'pointer' }} sm={6} md={4}>
          <AppWidgetSummary
            title="Bid Amount"
            total={fCurrency(allData?.totalBetAmount)}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_ammount_1.png" />}
            onClick={() => handleRoute('/all-bid-history')}
          />
        </Grid>

        <Grid
          xs={12}
          sx={{ cursor: 'pointer' }}
          sm={6}
          md={2}
          onClick={() => handleRoute('/user/unapproved')}
        >
          <AppWidgetSummary
            title="Unapproved All User"
            total={allData.unapprovedUsers}
            color="error"
          />
        </Grid>

        <Grid
          xs={12}
          sx={{ cursor: 'pointer' }}
          sm={6}
          md={2}
          onClick={() => handleRoute('/user/approved')}
        >
          <AppWidgetSummary
            title="Approved All User"
            total={allData.approvedUsers}
            color="success"
          />
        </Grid>

        <Grid
          xs={12}
          sx={{ cursor: 'pointer' }}
          sm={6}
          md={4 / 3}
          onClick={() => handleRoute('/game/game-name')}
        >
          <AppWidgetSummary title="Main" total={allData.mainMarkets} color="success" />
        </Grid>

        <Grid
          xs={12}
          sx={{ cursor: 'pointer' }}
          sm={6}
          md={4 / 3}
          onClick={() => handleRoute('/starline/game-name')}
        >
          <AppWidgetSummary title="Star" total={allData.starlineMarkets} color="success" />
        </Grid>

        <Grid
          xs={12}
          sx={{ cursor: 'pointer' }}
          sm={6}
          md={4 / 3}
          onClick={() => handleRoute('/gali/game-name')}
        >
          <AppWidgetSummary title="Gali" total={allData.galidisawarMarkets} color="success" />
        </Grid>

        <Grid xs={12} sm={6} md={2}>
          <AppWidgetSummary
            title="Total Deposit"
            total={fCurrency(allData.totalDepositAmount)}
            color="error"
            onClick={() => handleRoute('/wallet/fund-request')}
          />
        </Grid>

        <Grid xs={12} sm={6} md={2}>
          <AppWidgetSummary
            title="Total Withdrawal"
            total={fCurrency(allData.totalWithdrawlAmount)}
            color="error"
            onClick={() => handleRoute('/wallet/winthdraw-request')}
          />
        </Grid>

        <Grid container spacing={3}>
          <Grid xs={12} sm={2} md={4}>
            <Card
              component={Stack}
              spacing={3}
              direction="column"
              sx={{
                px: 3,
                py: 3,
                borderRadius: 2,
              }}
            >
              <CardHeader title={`Total Bids On Single Ank Of ${todayDate}`} />
              <Autocomplete
                freeSolo
                sx={{ width: '100%', maxWidth: 350 }}
                id="free-solo-2-demo"
                disableClearable
                options={markets}
                onChange={async (event, newValue) => {
                  if (newValue) {
                    // console.log(newValue.market_id);
                    setFormData({
                      ...formData,
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
                    {option.title}
                  </Box>
                )}
                renderInput={(params) => <TextField {...params} label="Market List" />}
              />

              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Session</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.session}
                    label="Session"
                    onChange={(newValue) => {
                      // console.log(newValue.target.value);
                      setFormData({
                        ...formData,
                        session: newValue.target.value,
                      });
                    }}
                  >
                    <MenuItem value="open">Open</MenuItem>
                    <MenuItem value="close">Close</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Button
                variant="contained"
                color="inherit"
                onClick={() => handelAnk()}
                endIcon={<Iconify icon="maki:arrow" />}
              >
                Submit
              </Button>
            </Card>
          </Grid>

          <Grid xs={12} sm={10} md={8}>
            <Grid container spacing={0.5} columns={10}>
              {allAnkData.map((ank) => (
                <Grid key={ank._id} xs={12} sm={6} md={2}>
                  <AppWidgetSummary
                    title="Total Bid"
                    subtitle={`Ank ${ank?._id}`}
                    total={ank?.total_points}
                    color="error"
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{ width: '100%', typography: 'body1', p: 1 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              variant="scrollable"
              scrollButtons="auto"
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab label="QR Deposit Transaction" value="1" />
              <Tab label="User Withdrawal Transaction" value="2" />
            </TabList>
          </Box>
          <TabPanel sx={{ py: 2, px: 0 }} value="1">
            <Card>
              <PuspaTableToolbar
                numSelected={selectedDep.length}
                filterName={filterDepName}
                onFilterName={handleDepFilterByName}
              />

              <Scrollbar>
                <TableContainer sx={{ overflow: 'unset' }}>
                  <Loader isLoading={loading}>
                    <Table sx={{ minWidth: 800 }}>
                      <PuspaTableHead
                        order={orderDep}
                        orderBy={orderByDep}
                        rowCount={userDepData.length}
                        numSelected={selectedDep.length}
                        onRequestSort={handleDepSort}
                        onSelectAllClick={handleDepSelectAllClick}
                        headLabel={[
                          { id: 'id', label: '#' },
                          { id: 'user', label: 'User Name' },
                          { id: 'amount', label: 'Ammount' },
                          { id: 'prev_balance', label: 'Prev.' },
                          { id: 'current_balance', label: 'Current' },
                          { id: 'status', label: 'Status' },
                          { id: 'view', label: 'View' },
                          // { id: 'Note', label: 'Note' },
                          { id: 'updatedAt', label: 'Date' },
                          { id: 'action', label: 'Action' },
                        ]}
                      />
                      <TableBody>
                        {dataDepFiltered
                          .slice(
                            pageDep * rowsPerDepPage,
                            pageDep * rowsPerDepPage + rowsPerDepPage
                          )
                          .map((row, index) => (
                            <PuspaTableRow
                              key={index}
                              id={index + 1}
                              trxId={row._id}
                              user={row?.user_id?.user_name}
                              amount={row?.amount}
                              prev_balance={row.prev_balance}
                              current_balance={row.current_balance}
                              note={row.note}
                              status={row.status}
                              view={row.payment_proof}
                              updatedAt={row.updatedAt}
                              transfer_type={row.transfer_type}
                              openViewModal={openViewModal}
                              openActionModal={openActionModal}
                            />
                          ))}

                        <PuspaTableEmptyRows
                          height={77}
                          emptyRows={emptyRows(pageDep, rowsPerDepPage, userDepData.length)}
                        />

                        {notDepFound && noDepData ? (
                          <PuspaTableNoData query={notDepFound ? filterDepName : undefined} />
                        ) : null}
                      </TableBody>
                    </Table>
                  </Loader>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                page={pageDep}
                component="div"
                count={userDepData.length}
                rowsPerPage={rowsPerDepPage}
                onPageChange={handleDepChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleDepChangeRowsPerPage}
              />
            </Card>
          </TabPanel>
          <TabPanel sx={{ py: 2, px: 0 }} value="2">
            <Card>
              <Puspa2TableToolbar
                numSelected={selectedBet.length}
                filterName={filterBetName}
                onFilterName={handleBetFilterByName}
              />

              <Scrollbar>
                <TableContainer sx={{ overflow: 'unset' }}>
                  <Loader isLoading={loading}>
                    <Table sx={{ minWidth: 800 }}>
                      <Puspa2TableHead
                        order={orderBet}
                        orderBy={orderByBet}
                        rowCount={userBetData.length}
                        numSelected={selectedBet.length}
                        onRequestSort={handleBetSort}
                        onSelectAllClick={handleBetSelectAllClick}
                        headLabel={[
                          { id: 'id', label: '#' },
                          { id: 'user', label: 'User Name' },
                          { id: 'amount', label: 'Ammount' },
                          { id: 'prev_balance', label: 'Prev.' },
                          { id: 'current_balance', label: 'Current' },
                          { id: 'status', label: 'Status' },
                          { id: 'view', label: 'View' },
                          { id: 'updatedAt', label: 'Date' },
                          { id: 'action', label: 'Action' },
                        ]}
                      />
                      <TableBody>
                        {dataBetFiltered
                          .slice(
                            pageBet * rowsPerBetPage,
                            pageBet * rowsPerBetPage + rowsPerBetPage
                          )
                          .map((row, index) => (
                            <Puspa2TableRow
                              key={index}
                              id={index + 1}
                              trxId={row._id}
                              user={row?.user_id}
                              amount={row?.amount}
                              prev_balance={row.prev_balance}
                              current_balance={row.current_balance}
                              note={row.note}
                              status={row.status}
                              type={row.type}
                              updatedAt={row.updatedAt}
                              transfer_type={row.transfer_type}
                              openViewModal={openWithViewModal}
                              openActionModal={openWithActionModal}
                            />
                          ))}

                        <Puspa2TableEmptyRows
                          height={77}
                          emptyRows={emptyRows(pageBet, rowsPerBetPage, userBetData.length)}
                        />

                        {notBetFound && noBetData ? (
                          <Puspa2TableNoData query={notBetFound ? filterBetName : undefined} />
                        ) : null}
                      </TableBody>
                    </Table>
                  </Loader>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                page={pageBet}
                component="div"
                count={userBetData.length}
                rowsPerPage={rowsPerBetPage}
                onPageChange={handleBetChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleBetChangeRowsPerPage}
              />
            </Card>
          </TabPanel>
        </TabContext>
      </Box>
      {/* ============================= Modal Work ============================= */}

      <Puspa2ModalView
        isOpen={isWithViewModalOpen}
        onClose={closeWithViewModal}
        viewData={viewWithData}
      />
      <Puspa2ModalAction
        isOpen={isWithActionModalOpen}
        onClose={closeWithActionModal}
        actionData={actionWithData}
      />

      <PuspaModalView isOpen={isViewModalOpen} onClose={closeViewModal} viewData={viewData} />
      <PuspaModalAction
        isOpen={isActionModalOpen}
        onClose={closeActionModal}
        actionData={actionData}
      />
    </Container>
  );
}
