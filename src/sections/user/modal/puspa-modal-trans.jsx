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

import Loader from 'src/loader/loader';
import { transactionHistoryApi } from 'src/apis/transactionApi';

import Scrollbar from 'src/components/scrollbar';

import PuspaTableRow from './puspa-trans-table/puspa-table-row';
import PuspaTableHead from './puspa-trans-table/puspa-table-head';
import PuspaTableNoData from './puspa-trans-table/puspa-table-no-data';
import PuspaTableToolbar from './puspa-trans-table/puspa-table-toolbar';
import PuspaTableEmptyRows from './puspa-trans-table/puspa-table-empty-rows';
import { emptyRows, applyFilter, getComparator } from './puspa-trans-table/utils';

export default function PuspaModalTransactionView({ isOpen, onClose, userIdData, name }) {
  // const { handleSuccess, handleError } = useAlert();

  const [loading, setLoading] = useState(false);

  const [adminData, setAdminData] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Call the API function with the desired data
        if (userIdData) {
          const result = await transactionHistoryApi({ user_id: userIdData, type: 'transfer' });
          setAdminData(result?.data); // Assuming the API returns an object with a 'data' property
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData(); // API call when modal is closed
  }, [userIdData]); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = adminData.map((n) => n.name);
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
    inputData: adminData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !!filterName;

  const noData = !dataFiltered.length;

  // ===================================== User History =========================

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
          const result = await transactionHistoryApi({ user_id: userIdData, type: 'mobile' });
          setUserWinData(result?.data); // Assuming the API returns an object with a 'data' property
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData(); // API call when modal is closed
  }, [userIdData]); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

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

  // ===================================== Bet History =========================

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
        if (userIdData) {
          const result = await transactionHistoryApi({ user_id: userIdData, type: 'bet' });
          setUserBetData(result?.data); // Assuming the API returns an object with a 'data' property
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData(); // API call when modal is closed
  }, [userIdData]); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  const handleBetSort = (event, id) => {
    const isAsc = orderByBet === id && order === 'asc';
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
    comparator: getComparator(order, orderBy),
    filterBetName,
  });

  const notBetFound = !!filterBetName;

  const noBetData = !dataBetFiltered.length;

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
            {name ? capitalizeString(name) : 'User'}&apos;s Transaction History:
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
                variant="scrollable"
                scrollButtons="auto"
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Admin Transaction" value="1" />
                <Tab label="User Transaction" value="2" />
                {/* <Tab label="User Bid Transaction" value="3" /> */}
              </TabList>
            </Box>
            <TabPanel value="1">
              <Card>
                <PuspaTableToolbar
                  numSelected={selected.length}
                  filterName={filterName}
                  onFilterName={handleFilterByName}
                />

                <Scrollbar>
                  <TableContainer sx={{ overflow: 'unset' }}>
                    <Loader isLoading={loading}>
                      <Table className="responsive-table">
                        <PuspaTableHead
                          order={order}
                          orderBy={orderBy}
                          rowCount={adminData.length}
                          numSelected={selected.length}
                          onRequestSort={handleSort}
                          onSelectAllClick={handleSelectAllClick}
                          headLabel={[
                            { id: 'id', label: '#' },
                            { id: 'amount', label: 'Ammount' },
                            { id: 'transfer_type', label: 'Type' },
                            { id: 'note', label: 'Note' },
                            { id: 'status', label: 'Status' },
                            { id: 'prev_balance', label: 'Prev. Balance' },
                            { id: 'current_balance', label: 'Current Balance' },
                            { id: 'updatedAt', label: 'Date' },
                          ]}
                        />
                        <TableBody>
                          {dataFiltered
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                              <PuspaTableRow
                                key={index}
                                id={index + 1}
                                amount={row?.amount}
                                prev_balance={row.prev_balance}
                                current_balance={row.current_balance}
                                note={row.note}
                                status={row.status}
                                updatedAt={row.updatedAt}
                                transfer_type={row.transfer_type}
                              />
                            ))}

                          <PuspaTableEmptyRows
                            height={77}
                            emptyRows={emptyRows(page, rowsPerPage, adminData.length)}
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
                  count={adminData.length}
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
                          headLabel={[
                            { id: 'id', label: '#' },
                            { id: 'amount', label: 'Ammount' },
                            { id: 'transfer_type', label: 'Type' },
                            { id: 'note', label: 'Note' },
                            { id: 'status', label: 'Status' },
                            { id: 'prev_balance', label: 'Prev. Balance' },
                            { id: 'current_balance', label: 'Current Balance' },
                            { id: 'updatedAt', label: 'Date' },
                          ]}
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
                                id={index + 1}
                                amount={row?.amount}
                                prev_balance={row.prev_balance}
                                current_balance={row.current_balance}
                                note={row.note}
                                status={row.status}
                                updatedAt={row.updatedAt}
                                transfer_type={row.transfer_type}
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
            <TabPanel value="3">
              <Card>
                <PuspaTableToolbar
                  numSelected={selectedBet.length}
                  filterName={filterBetName}
                  onFilterName={handleBetFilterByName}
                />

                <Scrollbar>
                  <TableContainer sx={{ overflow: 'unset' }}>
                    <Loader isLoading={loading}>
                      <Table className="responsive-table">
                        <PuspaTableHead
                          order={orderBet}
                          orderBy={orderByBet}
                          rowCount={userBetData.length}
                          numSelected={selectedBet.length}
                          onRequestSort={handleBetSort}
                          onSelectAllClick={handleBetSelectAllClick}
                          headLabel={[
                            { id: 'id', label: '#' },
                            { id: 'amount', label: 'Ammount' },
                            { id: 'transfer_type', label: 'Type' },
                            { id: 'note', label: 'Note' },
                            { id: 'status', label: 'Status' },
                            { id: 'prev_balance', label: 'Prev. Balance' },
                            { id: 'current_balance', label: 'Current Balance' },
                            { id: 'updatedAt', label: 'Date' },
                          ]}
                        />
                        <TableBody>
                          {dataBetFiltered
                            .slice(
                              pageBet * rowsPerBetPage,
                              pageBet * rowsPerBetPage + rowsPerBetPage
                            )
                            .map((row, index) => (
                              <PuspaTableRow
                                key={index}
                                id={index + 1}
                                amount={row?.amount}
                                prev_balance={row.prev_balance}
                                current_balance={row.current_balance}
                                note={row.note}
                                status={row.status}
                                updatedAt={row.updatedAt}
                                transfer_type={row.transfer_type}
                              />
                            ))}

                          <PuspaTableEmptyRows
                            height={77}
                            emptyRows={emptyRows(pageBet, rowsPerBetPage, userBetData.length)}
                          />

                          {notBetFound && noBetData ? (
                            <PuspaTableNoData query={notBetFound ? filterBetName : undefined} />
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
      </Box>
    </Modal>
  );
}

PuspaModalTransactionView.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  userIdData: PropTypes.string,
  name: PropTypes.string,
};
