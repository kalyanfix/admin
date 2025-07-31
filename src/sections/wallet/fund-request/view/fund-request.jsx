import 'jspdf-autotable';
import jsPDF from 'jspdf';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import TabList from '@mui/lab/TabList';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { formatDate } from 'src/utils/format-time';

import Loader from 'src/loader/loader';
import { transactionHistoryApi } from 'src/apis/transactionApi';

import Scrollbar from 'src/components/scrollbar';

import PuspaTableRow from '../puspa-table-row';
import PuspaTableHead from '../puspa-table-head';
import PuspaTableNoData from '../puspa-table-no-data';
import PuspaModalView from '../modal/puspa-modal-view';
import PuspaTableToolbar from '../puspa-table-toolbar';
import PuspaModalAction from '../modal/puspa-modal-action';
import PuspaTableEmptyRows from '../puspa-table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../utils';

export default function FundRequestPage() {
  const [loading, setLoading] = useState(false);
  const [adminData, setAdminData] = useState([]);
  const [userWinData, setUserWinData] = useState([]);
  const [userBetData, setUserBetData] = useState([]);

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

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [pageWin, setPageWin] = useState(0);
  const [orderWin, setOrderWin] = useState('asc');
  const [selectedWin, setSelectedWin] = useState([]);
  const [orderByWin, setOrderByWin] = useState('name');
  const [filterWinName, setFilterWinName] = useState('');
  const [rowsPerWinPage, setRowsPerWinPage] = useState(5);

  const [pageBet, setPageBet] = useState(0);
  const [orderBet, setOrderBet] = useState('asc');
  const [selectedBet, setSelectedBet] = useState([]);
  const [orderByBet, setOrderByBet] = useState('name');
  const [filterBetName, setFilterBetName] = useState('');
  const [rowsPerBetPage, setRowsPerBetPage] = useState(5);

  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const adminResult = await transactionHistoryApi({ type: 'transfer', transfer_type: 'deposit' });
        const userWinResult = await transactionHistoryApi({ type: 'mobile', transfer_type: 'auto' });
        const userBetResult = await transactionHistoryApi({ type: 'mobile', transfer_type: 'deposit' });

        setAdminData(adminResult?.data);
        setUserWinData(userWinResult?.data);
        setUserBetData(userBetResult?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    if (!isActionModalOpen) {
      fetchData(); // API call when modal is closed
    }
  }, [isActionModalOpen]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
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

  const handleWinSort = (event, id) => {
    const isAsc = orderByWin === id && order === 'asc';
    setOrderWin(isAsc ? 'desc' : 'asc');
    setOrderByWin(id);
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
    comparator: getComparator(orderWin, orderByWin),
    filterWinName,
  });

  const notWinFound = !!filterWinName;
  const noWinData = !dataWinFiltered.length;

  const handleBetSort = (event, id) => {
    const isAsc = orderByBet === id && order === 'asc';
    setOrderBet(isAsc ? 'desc' : 'asc');
    setOrderByBet(id);
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

  const downloadPDF = () => {
    /* eslint-disable new-cap */
    const doc = new jsPDF();
    let columns = [];
    let rows = [];
  
    if (value === '1') {
      columns = [
        { header: 'ID', dataKey: 'id' },
        { header: 'User Name', dataKey: 'user' },
        { header: 'Amount', dataKey: 'amount' },
        { header: 'Prev. Balance', dataKey: 'prev_balance' },
        { header: 'Current Balance', dataKey: 'current_balance' },
        { header: 'Status', dataKey: 'status' },
        { header: 'Date', dataKey: 'updatedAt' },
      ];
      rows = dataFiltered.map((row, index) => ({
        id: index + 1,
        user: row?.user_id?.user_name,
        amount: row?.amount,
        prev_balance: row.prev_balance,
        current_balance: row.current_balance,
        status: row.status,
        updatedAt: formatDate(row.updatedAt),
      }));
    } else if (value === '2') {
      columns = [
        { header: 'ID', dataKey: 'id' },
        { header: 'User Name', dataKey: 'user' },
        { header: 'Amount', dataKey: 'amount' },
        { header: 'Prev. Balance', dataKey: 'prev_balance' },
        { header: 'Current Balance', dataKey: 'current_balance' },
        { header: 'Status', dataKey: 'status' },
        { header: 'Date', dataKey: 'updatedAt' },
      ];
      rows = dataWinFiltered.map((row, index) => ({
        id: index + 1,
        user: row?.user_id?.user_name,
        amount: row?.amount,
        prev_balance: row.prev_balance,
        current_balance: row.current_balance,
        status: row.status,
        updatedAt: formatDate(row.updatedAt),
      }));
    } else if (value === '3') {
      columns = [
        { header: 'ID', dataKey: 'id' },
        { header: 'User Name', dataKey: 'user' },
        { header: 'Amount', dataKey: 'amount' },
        { header: 'Prev.', dataKey: 'prev_balance' },
        { header: 'Current', dataKey: 'current_balance' },
        { header: 'Status', dataKey: 'status' },
        { header: 'Date', dataKey: 'updatedAt' },
      ];
      rows = dataBetFiltered.map((row, index) => ({
        id: index + 1,
        user: row?.user_id?.user_name,
        amount: row?.amount,
        prev_balance: row.prev_balance,
        current_balance: row.current_balance,
        status: row.status,
        updatedAt: formatDate(row.updatedAt),
      }));
    }
  
    doc.autoTable({
      columns,
      body: rows,
      margin: { top: 10 },
      styles: { fontSize: 8 },
      headStyles: { fillColor: [22, 160, 133] },
    });
  
    let fileName;
    if (value === '1') {
      fileName = 'admin_deposit_transaction.pdf';
    } else if (value === '2') {
      fileName = 'auto_deposit_transaction.pdf';
    } else {
      fileName = 'qr_deposit_transaction.pdf';
    }
  
    doc.save(fileName);
  };
  

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Fund Request</Typography>
        <Button variant="contained" color="inherit" onClick={downloadPDF}>
          Download PDF
        </Button>
      </Stack>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Admin Deposit Transaction" value="1" />
              <Tab label="Auto Deposit Transaction" value="2" />
              <Tab label="QR Deposit Transaction" value="3" />
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
                          { id: 'user', label: 'User Name' },
                          { id: 'amount', label: 'Ammount' },
                          { id: 'prev_balance', label: 'Prev. Balance' },
                          { id: 'current_balance', label: 'Current Balance' },
                          { id: 'status', label: 'Status' },
                          { id: 'updatedAt', label: 'Date' },
                        ]}
                      />
                      <TableBody>
                        {dataFiltered
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row, index) => (
                            <PuspaTableRow
                              key={row._id}
                              id={index + 1}
                              user={row?.user_id?.user_name}
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
                          { id: 'user', label: 'User Name' },
                          { id: 'amount', label: 'Ammount' },
                          { id: 'prev_balance', label: 'Prev. Balance' },
                          { id: 'current_balance', label: 'Current Balance' },
                          { id: 'status', label: 'Status' },
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
                              key={row._id}
                              id={index + 1}
                              user={row?.user_id?.user_name}
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

      <PuspaModalView isOpen={isViewModalOpen} onClose={closeViewModal} viewData={viewData} />
      <PuspaModalAction
        isOpen={isActionModalOpen}
        onClose={closeActionModal}
        actionData={actionData}
      />
    </Container>
  );
}
