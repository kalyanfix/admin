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

export default function WithdrawRequestPage() {
  const [loading, setLoading] = useState(false);
  const [adminData, setAdminData] = useState([]);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);

  const [viewData, setViewData] = useState();
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
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await transactionHistoryApi({
          type: 'transfer',
          transfer_type: 'withdrawl',
        });
        setAdminData(result?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
        const result = await transactionHistoryApi({ type: 'mobile', transfer_type: 'withdrawl' });
        setUserBetData(result?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    if (!isActionModalOpen) {
      fetchData();
    }
  }, [isActionModalOpen]);

  const handleBetSort = (event, id) => {
    const isAsc = orderByBet === id && orderBet === 'asc';
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
      fileName = 'admin_withdrawal_transaction.pdf';
    } else {
      fileName = 'user_withdrawal_transaction.pdf';
    }

    doc.save(fileName);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Withdraw Request</Typography>
        <Button variant="contained" color="inherit" onClick={downloadPDF}>
          Download PDF
        </Button>
      </Stack>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              variant="scrollable"
              scrollButtons="auto"
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Admin Withdrawal Transaction" value="1" />
              <Tab label="User Withdrawal Transaction" value="2" />
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
                <TableContainer className="responsive-table">
                  <Loader isLoading={loading}>
                    <Table sx={{ minWidth: 800 }}>
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
                              user={row?.user_id}
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
                              user={row?.user_id}
                              amount={row?.amount}
                              prev_balance={row.prev_balance}
                              current_balance={row.current_balance}
                              note={row.note}
                              status={row.status}
                              type={row.type}
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
