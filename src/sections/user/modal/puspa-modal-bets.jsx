import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import TabList from '@mui/lab/TabList';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { capitalizeString } from 'src/utils/format-string';

import { useAlert } from 'src/alert';
import Loader from 'src/loader/loader';
import { bidHistoryApi } from 'src/apis/betApi';

import Scrollbar from 'src/components/scrollbar';

import PuspaModalEditBet from './puspa-modal-edit-bet';
import PuspaTableRow from './puspa-bid-table/puspa-table-row';
import PuspaTableHead from './puspa-bid-table/puspa-table-head';
import PuspaTableNoData from './puspa-bid-table/puspa-table-no-data';
import PuspaTableToolbar from './puspa-bid-table/puspa-table-toolbar';
import PuspaTableEmptyRows from './puspa-bid-table/puspa-table-empty-rows';
import { emptyRows, applyFilter, getComparator } from './puspa-bid-table/utils';

// Named function to debounce calls
function debounce(fn, wait) {
  let timeout;
  return function debounced(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(context, args), wait);
  };
}

export default function PuspaModalBetHistoryView({ isOpen, onClose, userIdData, name }) {
  const { handleSuccess, handleError } = useAlert();

  const [isEditBetOpen, setIsEditBetOpen] = useState(false);
  const [changeBetData, setChangeBetData] = useState(null);

  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [value, setValue] = useState('1');

  const [marketValue, setMarketValue] = useState('main');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Call the API function with the desired data
        if (userIdData) {
          const result = await bidHistoryApi({ user_id: userIdData, tag: marketValue });
          setUserData(result?.data); // Assuming the API returns an object with a 'data' property
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData(); // API call when modal is closed
  }, [userIdData, marketValue]); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userData.map((n) => n.name);
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

  const handleSelectMarket = (marketData) => {
    // console.log(marketData);
    setMarketValue(marketData);
  };

  const dataFiltered = applyFilter({
    inputData: userData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !!filterName;

  const noData = !dataFiltered.length;

  // ===================================== Win History =========================

  const [userWinData, setUserWinData] = useState([]);

  const [pageWin, setPageWin] = useState(0);

  const [orderWin, setOrderWin] = useState('asc');

  const [selectedWin, setSelectedWin] = useState([]);

  const [orderByWin, setOrderByWin] = useState('name');

  const [filterWinName, setFilterWinName] = useState('');

  const [rowsPerWinPage, setRowsPerWinPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Call the API function with the desired data
        if (userIdData) {
          const result = await bidHistoryApi({ user_id: userIdData, win: true, tag: marketValue });
          setUserWinData(result?.data); // Assuming the API returns an object with a 'data' property
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData(); // API call when modal is closed
  }, [userIdData, marketValue]); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  const handleWinSort = (event, id) => {
    const isAsc = orderByWin === id && order === 'asc';
    if (id !== '') {
      setOrderWin(isAsc ? 'desc' : 'asc');
      setOrderByWin(id);
    }
  };

  const handleWinSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userWinData.map((n) => n.name);
      setSelectedWin(newSelecteds);
      return;
    }
    setSelectedWin([]);
  };

  const handleWinChangePage = (event, newPage) => {
    setPageWin(newPage);
  };

  const handleWinChangeRowsPerPage = (event) => {
    setPageWin(0);
    setRowsPerWinPage(parseInt(event.target.value, 10));
  };

  const handleWinFilterByName = (event) => {
    setPageWin(0);
    setFilterWinName(event.target.value);
  };

  const dataWinFiltered = applyFilter({
    inputData: userWinData,
    comparator: getComparator(order, orderBy),
    filterWinName,
  });

  const notWinFound = !!filterWinName;

  const noWinData = !dataWinFiltered.length;

  const getColumnHeaders = () => {
    switch (marketValue) {
      case 'starline':
        return [
          { id: 'market_name', label: 'Game Name' },
          { id: 'game_mode', label: 'Game Type' },
          { id: 'open_panna', label: 'Open Panna' },
          { id: 'open_digit', label: 'Open Digit' },
          { id: 'points', label: 'Points' },
          { id: 'createdAt', label: 'Date' },
          { id: '', label: 'Action' },
        ];
      case 'galidisawar':
        return [
          { id: 'market_name', label: 'Game Name' },
          { id: 'game_mode', label: 'Game Type' },
          { id: 'open_panna', label: 'Open Digit' },
          { id: 'close_digit', label: 'Close Digit' },
          { id: 'points', label: 'Points' },
          { id: 'createdAt', label: 'Date' },
          { id: '', label: 'Action' },
        ];
      case 'main':
      default:
        return [
          { id: 'market_name', label: 'Game Name' },
          { id: 'game_mode', label: 'Game Type' },
          { id: 'session', label: 'Session' },
          { id: 'open_panna', label: 'Open Panna' },
          { id: 'open_digit', label: 'Open Digit' },
          { id: 'close_panna', label: 'Close Panna' },
          { id: 'close_digit', label: 'Close Digit' },
          { id: 'points', label: 'Points' },
          { id: 'createdAt', label: 'Date' },
          { id: '', label: 'Action' },
        ];
    }
  };

  const getWinColumnHeaders = () => {
    switch (marketValue) {
      case 'starline':
        return [
          { id: 'market_name', label: 'Game Name' },
          { id: 'game_mode', label: 'Game Type' },
          { id: 'open_panna', label: 'Open Panna' },
          { id: 'open_digit', label: 'Open Digit' },
          { id: 'points', label: 'Points' },
          { id: 'points', label: 'Winning Points' },
          { id: 'createdAt', label: 'Date' },
        ];
      case 'galidisawar':
        return [
          { id: 'market_name', label: 'Game Name' },
          { id: 'game_mode', label: 'Game Type' },
          { id: 'open_digit', label: 'Left Digit' },
          { id: 'close_digit', label: 'Right Digit' },
          { id: 'points', label: 'Points' },
          { id: 'points', label: 'Winning Points' },
          { id: 'createdAt', label: 'Date' },
        ];
      case 'main':
      default:
        return [
          { id: 'market_name', label: 'Game Name' },
          { id: 'game_mode', label: 'Game Type' },
          { id: 'session', label: 'Session' },
          { id: 'open_panna', label: 'Open Panna' },
          { id: 'open_digit', label: 'Open Digit' },
          { id: 'close_panna', label: 'Close Panna' },
          { id: 'close_digit', label: 'Close Digit' },
          { id: 'points', label: 'Points' },
          { id: 'points', label: 'Winning Points' },
          { id: 'createdAt', label: 'Date' },
        ];
    }
  };

  // Debounce function for fetching data to avoid too frequent calls
  const fetchBidData = debounce(async () => {
    try {
      const res = await bidHistoryApi({ user_id: userIdData, tag: marketValue });
      handleSuccess(res?.message || 'Success');
      setUserData(res?.data || []);
    } catch (e) {
      handleError(e?.response?.data?.message || 'Error occurred');
    }
  }, 100);

  const openEditBetModal = (data) => {
    setChangeBetData(data);
    setIsEditBetOpen(true);
  };

  const closeEditBetModal = () => {
    setIsEditBetOpen(false);
    fetchBidData();
  };

  const editBet = (
    <PuspaModalEditBet betData={changeBetData} isOpen={isEditBetOpen} onClose={closeEditBetModal} />
  );

  return (
    <Modal
      scroll="body"
      sx={{
        position: 'absolute',
      }}
      disableScrollLock
      open={isOpen}
      onClose={onClose}
    >
      <>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            overflowY: 'auto',
            maxHeight: '90%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 24,
            width: {
              xs: '90%', // Full width for extra small screens
              sm: '90%',
              md: '90%',
            }, // Example width for the modal
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '0px solid lightgray',
              p: 2, // Padding for the header
            }}
          >
            {/* Title of the modal */}
            <Typography variant="h6">
              {name ? capitalizeString(name) : 'User'}&apos;s Bid History:
            </Typography>
            {/* Close button */}
            <IconButton onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
          {/* Modal content passed as prop */}
          <Box sx={{ p: 2 }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="lab API tabs example"
                >
                  <Tab label="User Bid History" value="1" />
                  <Tab label="User Bid Win History" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Card>
                  <PuspaTableToolbar
                    numSelected={selected.length}
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                    handleSelectMarket={handleSelectMarket}
                  />

                  <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                      <Loader isLoading={loading}>
                        <Table className="responsive-table">
                          <PuspaTableHead
                            order={order}
                            orderBy={orderBy}
                            rowCount={userData.length}
                            numSelected={selected.length}
                            onRequestSort={handleSort}
                            onSelectAllClick={handleSelectAllClick}
                            headLabel={getColumnHeaders()}
                          />
                          <TableBody>
                            {dataFiltered
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row, index) => (
                                <PuspaTableRow
                                  key={index}
                                  id={row._id}
                                  market_name={row?.market_name}
                                  game_mode={row.game_mode}
                                  session={row.session}
                                  open_panna={row.open_panna}
                                  open_digit={row.open_digit}
                                  close_panna={row.close_panna}
                                  close_digit={row.close_digit}
                                  win={row.win}
                                  points={row.points}
                                  createdAt={row.createdAt}
                                  marketValue={marketValue}
                                  openEditBetModal={openEditBetModal}
                                />
                              ))}

                            <PuspaTableEmptyRows
                              height={77}
                              emptyRows={emptyRows(page, rowsPerPage, userData.length)}
                            />

                            {notFound && noData ? (
                              <PuspaTableNoData query={notFound ? filterName : undefined} />
                            ) : null}
                          </TableBody>
                        </Table>
                      </Loader>
                    </TableContainer>
                  </Scrollbar>

                  <TablePagination
                    page={page}
                    component="div"
                    count={userData.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Card>
              </TabPanel>
              <TabPanel value="2">
                <Card>
                  <PuspaTableToolbar
                    numSelected={selectedWin.length}
                    filterName={filterWinName}
                    onFilterName={handleWinFilterByName}
                    handleSelectMarket={handleSelectMarket}
                  />

                  <Scrollbar>
                    <TableContainer sx={{ overflow: 'unset' }}>
                      <Loader isLoading={loading}>
                        <Table className="responsive-table">
                          <PuspaTableHead
                            order={orderWin}
                            orderBy={orderByWin}
                            rowCount={userWinData.length}
                            numSelected={selectedWin.length}
                            onRequestSort={handleWinSort}
                            onSelectAllClick={handleWinSelectAllClick}
                            headLabel={getWinColumnHeaders()}
                          />
                          <TableBody>
                            {dataWinFiltered
                              .slice(
                                pageWin * rowsPerWinPage,
                                pageWin * rowsPerWinPage + rowsPerWinPage
                              )
                              .map((row, index) => (
                                <PuspaTableRow
                                  key={index}
                                  market_name={row?.market_name}
                                  game_mode={row.game_mode}
                                  session={row.session}
                                  open_panna={row.open_panna}
                                  open_digit={row.open_digit}
                                  close_panna={row.close_panna}
                                  close_digit={row.close_digit}
                                  win={row.win}
                                  points={row.points}
                                  winning_amount={row.winning_amount}
                                  createdAt={row.updatedAt}
                                  marketValue={marketValue}
                                  openEditBetModal={openEditBetModal}
                                />
                              ))}

                            <PuspaTableEmptyRows
                              height={77}
                              emptyRows={emptyRows(pageWin, rowsPerWinPage, userWinData.length)}
                            />

                            {notWinFound && noWinData ? (
                              <PuspaTableNoData query={notWinFound ? filterWinName : undefined} />
                            ) : null}
                          </TableBody>
                        </Table>
                      </Loader>
                    </TableContainer>
                  </Scrollbar>

                  <TablePagination
                    page={pageWin}
                    component="div"
                    count={userWinData.length}
                    rowsPerPage={rowsPerWinPage}
                    onPageChange={handleWinChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleWinChangeRowsPerPage}
                  />
                </Card>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
        {editBet}
      </>
    </Modal>
  );
}

PuspaModalBetHistoryView.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  userIdData: PropTypes.string,
  name: PropTypes.string,
};
