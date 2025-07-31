import { useMemo, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import TabList from '@mui/lab/TabList';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { useAlert } from 'src/alert';
import Loader from 'src/loader/loader';
import { useApiSettingsCalls } from 'src/api/settingsApi';
import {
  fetchAllUsers,
  fetchSettingUsers,
  fetchApprovedUsers,
  fetchUnverifiedUsers,
  fetchUnapprovedUsers,
} from 'src/_mock/user_mng';

import Scrollbar from 'src/components/scrollbar';

import PuspaTableRow from '../puspa-table-row';
import PuspaTableHead from '../puspa-table-head';
import PuspaTableNoData from '../puspa-table-no-data';
import PuspaModalView from '../modal/puspa-modal-view';
import PuspaTableToolbar from '../puspa-table-toolbar';
import PuspaTableEmptyRows from '../puspa-table-empty-rows';
import PuspaModalAddFund from '../modal/puspa-modal-add-fund';
import PuspaModalBetHistoryView from '../modal/puspa-modal-bets';
import { emptyRows, applyFilter, getComparator } from '../utils';
import PuspaModalTransactionView from '../modal/puspa-modal-trans';
import PuspaModalWithDrawFund from '../modal/puspa-modal-withdraw-fund';

// ----------------------------------------------------------------------

export default function UserPage() {
  const { handleSuccess, handleError } = useAlert();
  const { autoVerifiedSettingsUpdateApi } = useApiSettingsCalls();
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [allApprovedUsers, setAllApprovedUsers] = useState([]);
  const [allUnapprovedUsers, setAllUnapprovedUsers] = useState([]);
  const [allUnverifiedUsers, setAllUnverifiedUsers] = useState([]);
  const [page, setPage] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBetModalOpen, setIsBetModalOpen] = useState(false);
  const [isTransModalOpen, setIsTransModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const [userIdData, setUserIdData] = useState(null);
  const [userNameData, setUserNameData] = useState('');
  const [order, setOrder] = useState('asc');
  const [allSelected, setAllSelected] = useState([]);
  const [approvedSelected, setApprovedSelected] = useState([]);
  const [unapprovedSelected, setUnapprovedSelected] = useState([]);
  const [unverifiedSelected, setUnverifiedSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tabValue, setTabValue] = useState('1');
  const [autoVerified, setAutoVerified] = useState();

  // Map routes to tab values
  const routeToTabMap = useMemo(
    () => ({
      '/user/all': '1',
      '/user/approved': '2',
      '/user/unapproved': '3',
      '/user/downloaded': '4',
    }),
    []
  );

  // Update tab value based on the current route
  useEffect(() => {
    const route = location.pathname;
    const tab = routeToTabMap[route] || '1';
    setTabValue(tab);
  }, [location.pathname, routeToTabMap]);

  // Handle tab change
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
    const route = Object.keys(routeToTabMap).find((key) => routeToTabMap[key] === newValue);
    navigate(route);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userData = await fetchAllUsers();
        setAllUsers(userData);
      } catch (err) {
        // console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (!isModalOpen || !isAddModalOpen || !isWithdrawModalOpen) {
      fetchData();
    }
  }, [isModalOpen, isAddModalOpen, isWithdrawModalOpen]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userData = await fetchApprovedUsers(true);
        setAllApprovedUsers(userData);
      } catch (err) {
        // console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (!isModalOpen || !isAddModalOpen || !isWithdrawModalOpen) {
      fetchData();
    }
  }, [isModalOpen, isAddModalOpen, isWithdrawModalOpen]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userData = await fetchUnapprovedUsers(false);
        setAllUnapprovedUsers(userData);
      } catch (err) {
        // console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (!isModalOpen || (!isAddModalOpen && !isWithdrawModalOpen)) {
      fetchData();
    }
  }, [isModalOpen, isAddModalOpen, isWithdrawModalOpen]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userData = await fetchUnverifiedUsers(false);
        setAllUnverifiedUsers(userData);
      } catch (err) {
        // console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (!isModalOpen || (!isAddModalOpen && !isWithdrawModalOpen)) {
      fetchData();
    }
  }, [isModalOpen, isAddModalOpen, isWithdrawModalOpen]);

  const handleToggle = () => {
    fetchAllUsers().then((userData) => setAllUsers(userData));
    fetchApprovedUsers(true).then((userData) => setAllApprovedUsers(userData));
    fetchUnapprovedUsers(false).then((userData) => setAllUnapprovedUsers(userData));
    fetchUnverifiedUsers(false).then((userData) => setAllUnverifiedUsers(userData));
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const allHandleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = allDataFiltered.map((n) => n.name);
      setAllSelected(newSelecteds);
      return;
    }
    setAllSelected([]);
  };

  const approvedHandleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = approvedDataFiltered.map((n) => n.name);
      setApprovedSelected(newSelecteds);
      return;
    }
    setApprovedSelected([]);
  };

  const unapprovedHandleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = unapprovedDataFiltered.map((n) => n.name);
      setUnapprovedSelected(newSelecteds);
      return;
    }
    setUnapprovedSelected([]);
  };

  const unverifiedHandleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = unverifiedSelected.map((n) => n.name);
      setUnverifiedSelected(newSelecteds);
      return;
    }
    setUnverifiedSelected([]);
  };

  const allHandleClick = (event, name) => {
    const selectedIndex = allSelected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(allSelected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(allSelected.slice(1));
    } else if (selectedIndex === allSelected.length - 1) {
      newSelected = newSelected.concat(allSelected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        allSelected.slice(0, selectedIndex),
        allSelected.slice(selectedIndex + 1)
      );
    }
    setAllSelected(newSelected);
  };

  const approvedHandleClick = (event, name) => {
    const selectedIndex = approvedSelected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(approvedSelected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(approvedSelected.slice(1));
    } else if (selectedIndex === approvedSelected.length - 1) {
      newSelected = newSelected.concat(approvedSelected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        approvedSelected.slice(0, selectedIndex),
        approvedSelected.slice(selectedIndex + 1)
      );
    }
    setApprovedSelected(newSelected);
  };

  const unapprovedHandleClick = (event, name) => {
    const selectedIndex = unapprovedSelected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(unapprovedSelected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(unapprovedSelected.slice(1));
    } else if (selectedIndex === unapprovedSelected.length - 1) {
      newSelected = newSelected.concat(unapprovedSelected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        unapprovedSelected.slice(0, selectedIndex),
        unapprovedSelected.slice(selectedIndex + 1)
      );
    }
    setUnapprovedSelected(newSelected);
  };

  const unverifiedHandleClick = (event, name) => {
    const selectedIndex = unverifiedSelected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(unverifiedSelected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(unverifiedSelected.slice(1));
    } else if (selectedIndex === unverifiedSelected.length - 1) {
      newSelected = newSelected.concat(unverifiedSelected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        unverifiedSelected.slice(0, selectedIndex),
        unverifiedSelected.slice(selectedIndex + 1)
      );
    }
    setUnverifiedSelected(newSelected);
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

  const allDataFiltered = applyFilter({
    inputData: allUsers,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const approvedDataFiltered = applyFilter({
    inputData: allApprovedUsers,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const unapprovedDataFiltered = applyFilter({
    inputData: allUnapprovedUsers,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const unverifiedDataFiltered = applyFilter({
    inputData: allUnverifiedUsers,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const openViewModal = (data) => {
    setIsModalOpen(true);
    setUserIdData(data);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openBetModal = (user_id, name) => {
    setUserNameData(name);
    setUserIdData(user_id);
    setIsBetModalOpen(true);
  };

  const closeBetModal = () => {
    setIsBetModalOpen(false);
  };

  const openTransModal = (user_id, name) => {
    setUserNameData(name);
    setUserIdData(user_id);
    setIsTransModalOpen(true);
  };

  const closeTransModal = () => {
    setIsTransModalOpen(false);
  };

  const openAddModal = (user_id, name) => {
    setUserIdData(user_id);
    setUserNameData(name);
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openWithdrawModal = (user_id, name) => {
    setUserIdData(user_id);
    setUserNameData(name);
    setIsWithdrawModalOpen(true);
  };

  const closeWithdrawModal = () => {
    setIsWithdrawModalOpen(false);
  };

  const notFound = !approvedDataFiltered.length && !unapprovedDataFiltered.length && !!filterName;

  const handleStatusChange = async (event, newStatus) => {
    if (newStatus !== null) {
      setAutoVerified(newStatus);
      await autoVerifiedSettingsUpdateApi()
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
        const userSettings = await fetchSettingUsers();
        // console.log(userSettings);
        setAutoVerified(userSettings ? 'active' : 'inactive');
      } catch (err) {
        // console.log(err);
      }
    };
    fetchData();
  }, [autoVerified]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Auto - Activation: &nbsp;&nbsp;&nbsp;</Typography>
          <ToggleButtonGroup
            value={autoVerified}
            color={autoVerified === 'active' ? 'success' : 'error'}
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

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="All User" value="1" />
              <Tab label="Approved User" value="2" />
              <Tab label="Unapproved User" value="3" />
              <Tab label="Downloaded User" value="4" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <Card>
              <PuspaTableToolbar
                numSelected={allSelected.length}
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
                        rowCount={allDataFiltered.length}
                        numSelected={allSelected.length}
                        onRequestSort={handleSort}
                        onSelectAllClick={allHandleSelectAllClick}
                        headLabel={[
                          { id: 'name', label: 'Name' },
                          { id: 'mobile', label: 'Mobile' },
                          { id: 'date', label: 'Date' },
                          { id: 'balance', label: 'Balance' },
                          { id: 'betting', label: 'Betting' },
                          { id: 'active', label: 'Active' },
                          { id: 'transfer', label: 'Transfer' },
                          { id: '' },
                        ]}
                      />
                      <TableBody>
                        {allDataFiltered
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => (
                            <PuspaTableRow
                              key={row.id}
                              name={row.name}
                              mobile={row.mobile}
                              date={row.date}
                              balance={row.balance}
                              betting={row.betting}
                              active={row.active}
                              transfer={row.transfer}
                              avatarUrl={row.avatarUrl}
                              status={row.status}
                              isVerified={row.isVerified}
                              user_id={row.user_id}
                              selected={allSelected.indexOf(row.name) !== -1}
                              handleClick={(event) => allHandleClick(event, row.name)}
                              handleToggle={handleToggle}
                              openViewModal={openViewModal}
                              openAddModal={openAddModal}
                              openWithdrawModal={openWithdrawModal}
                              openBetModal={openBetModal}
                              openTransModal={openTransModal}
                            />
                          ))}
                        <PuspaTableEmptyRows
                          height={77}
                          emptyRows={emptyRows(page, rowsPerPage, allDataFiltered.length)}
                        />
                        {notFound && <PuspaTableNoData query={filterName} />}
                      </TableBody>
                    </Table>
                  </Loader>
                </TableContainer>
              </Scrollbar>
              <TablePagination
                page={page}
                component="div"
                count={allDataFiltered.length}
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
                numSelected={approvedSelected.length}
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
                        rowCount={approvedDataFiltered.length}
                        numSelected={approvedSelected.length}
                        onRequestSort={handleSort}
                        onSelectAllClick={approvedHandleSelectAllClick}
                        headLabel={[
                          { id: 'name', label: 'Name' },
                          { id: 'mobile', label: 'Mobile' },
                          { id: 'date', label: 'Date' },
                          { id: 'balance', label: 'Balance' },
                          { id: 'betting', label: 'Betting' },
                          { id: 'active', label: 'Active' },
                          { id: 'transfer', label: 'Transfer' },
                          { id: '' },
                        ]}
                      />
                      <TableBody>
                        {approvedDataFiltered
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => (
                            <PuspaTableRow
                              key={row.id}
                              name={row.name}
                              mobile={row.mobile}
                              date={row.date}
                              balance={row.balance}
                              betting={row.betting}
                              active={row.active}
                              transfer={row.transfer}
                              avatarUrl={row.avatarUrl}
                              status={row.status}
                              isVerified={row.isVerified}
                              user_id={row.user_id}
                              selected={approvedSelected.indexOf(row.name) !== -1}
                              handleClick={(event) => approvedHandleClick(event, row.name)}
                              handleToggle={handleToggle}
                              openViewModal={openViewModal}
                              openAddModal={openAddModal}
                              openWithdrawModal={openWithdrawModal}
                              openBetModal={openBetModal}
                              openTransModal={openTransModal}
                            />
                          ))}
                        <PuspaTableEmptyRows
                          height={77}
                          emptyRows={emptyRows(page, rowsPerPage, approvedDataFiltered.length)}
                        />
                        {notFound && <PuspaTableNoData query={filterName} />}
                      </TableBody>
                    </Table>
                  </Loader>
                </TableContainer>
              </Scrollbar>
              <TablePagination
                page={page}
                component="div"
                count={approvedDataFiltered.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </TabPanel>

          <TabPanel value="3">
            <Card>
              <PuspaTableToolbar
                numSelected={unapprovedSelected.length}
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
                        rowCount={unapprovedDataFiltered.length}
                        numSelected={unapprovedSelected.length}
                        onRequestSort={handleSort}
                        onSelectAllClick={unapprovedHandleSelectAllClick}
                        headLabel={[
                          { id: 'name', label: 'Name' },
                          { id: 'mobile', label: 'Mobile' },
                          { id: 'date', label: 'Date' },
                          { id: 'balance', label: 'Balance' },
                          { id: 'betting', label: 'Betting' },
                          { id: 'active', label: 'Active' },
                          { id: 'transfer', label: 'Transfer' },
                          { id: '' },
                        ]}
                      />
                      <TableBody>
                        {unapprovedDataFiltered
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => (
                            <PuspaTableRow
                              key={row.id}
                              name={row.name}
                              mobile={row.mobile}
                              date={row.date}
                              balance={row.balance}
                              betting={row.betting}
                              active={row.active}
                              transfer={row.transfer}
                              avatarUrl={row.avatarUrl}
                              status={row.status}
                              isVerified={row.isVerified}
                              user_id={row.user_id}
                              selected={unapprovedSelected.indexOf(row.name) !== -1}
                              handleClick={(event) => unapprovedHandleClick(event, row.name)}
                              handleToggle={handleToggle}
                              openViewModal={openViewModal}
                              openAddModal={openAddModal}
                              openWithdrawModal={openWithdrawModal}
                              openBetModal={openBetModal}
                              openTransModal={openTransModal}
                            />
                          ))}
                        <PuspaTableEmptyRows
                          height={77}
                          emptyRows={emptyRows(page, rowsPerPage, unapprovedDataFiltered.length)}
                        />
                        {notFound && <PuspaTableNoData query={filterName} />}
                      </TableBody>
                    </Table>
                  </Loader>
                </TableContainer>
              </Scrollbar>
              <TablePagination
                page={page}
                component="div"
                count={unapprovedDataFiltered.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </TabPanel>

          <TabPanel value="4">
            <Card>
              <PuspaTableToolbar
                numSelected={unverifiedSelected.length}
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
                        rowCount={unverifiedDataFiltered.length}
                        numSelected={unverifiedSelected.length}
                        onRequestSort={handleSort}
                        onSelectAllClick={unverifiedHandleSelectAllClick}
                        headLabel={[
                          { id: 'name', label: 'Name' },
                          { id: 'mobile', label: 'Mobile' },
                          { id: 'date', label: 'Date' },
                          { id: 'balance', label: 'Balance' },
                          { id: 'betting', label: 'Betting' },
                          { id: 'active', label: 'Active' },
                          { id: 'transfer', label: 'Transfer' },
                          { id: '' },
                        ]}
                      />
                      <TableBody>
                        {unverifiedDataFiltered
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => (
                            <PuspaTableRow
                              key={row.id}
                              name={row.name}
                              mobile={row.mobile}
                              date={row.date}
                              balance={row.balance}
                              betting={row.betting}
                              active={row.active}
                              transfer={row.transfer}
                              avatarUrl={row.avatarUrl}
                              status={row.status}
                              isVerified={row.isVerified}
                              user_id={row.user_id}
                              selected={unverifiedSelected.indexOf(row.name) !== -1}
                              handleClick={(event) => unverifiedHandleClick(event, row.name)}
                              handleToggle={handleToggle}
                              openViewModal={openViewModal}
                              openAddModal={openAddModal}
                              openWithdrawModal={openWithdrawModal}
                              openBetModal={openBetModal}
                              openTransModal={openTransModal}
                            />
                          ))}
                        <PuspaTableEmptyRows
                          height={77}
                          emptyRows={emptyRows(page, rowsPerPage, unverifiedDataFiltered.length)}
                        />
                        {notFound && <PuspaTableNoData query={filterName} />}
                      </TableBody>
                    </Table>
                  </Loader>
                </TableContainer>
              </Scrollbar>
              <TablePagination
                page={page}
                component="div"
                count={unverifiedDataFiltered.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </TabPanel>
        </TabContext>
      </Box>

      <PuspaModalView isOpen={isModalOpen} onClose={closeModal} userIdData={userIdData} />

      <PuspaModalBetHistoryView
        isOpen={isBetModalOpen}
        onClose={closeBetModal}
        userIdData={userIdData}
        name={userNameData}
      />

      <PuspaModalTransactionView
        isOpen={isTransModalOpen}
        onClose={closeTransModal}
        userIdData={userIdData}
        name={userNameData}
      />

      <PuspaModalAddFund
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        userIdData={userIdData}
        name={userNameData}
      />
      <PuspaModalWithDrawFund
        isOpen={isWithdrawModalOpen}
        onClose={closeWithdrawModal}
        userIdData={userIdData}
        name={userNameData}
      />
    </Container>
  );
}
