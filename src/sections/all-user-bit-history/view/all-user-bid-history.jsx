import 'jspdf-autotable';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import 'dayjs/locale/en-gb';
import { useRef, useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { formatDate, formatResultDate } from 'src/utils/format-time';

import { useAlert } from 'src/alert';
import { useApiBetCalls } from 'src/api/betApi';

import Scrollbar from 'src/components/scrollbar';

import PuspaTableRow from '../puspa-table-row';
import PuspaTableHead from '../puspa-table-head';
import PuspaTableNoData from '../puspa-table-no-data';
import PuspaTableToolbar from '../puspa-table-toolbar';
import PuspaTableEmptyRows from '../puspa-table-empty-rows';
import PuspaModalEditBet from '../modal/puspa-modal-edit-bet';
import { emptyRows, applyFilter, getComparator } from '../utils';

// Named function to debounce calls
function debounce(fn, wait) {
  let timeout;
  return function debounced(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(context, args), wait);
  };
}

export default function UserBidHistoryPage() {
  const todayDate = new Date();
  const { bidHistoryApi } = useApiBetCalls();
  const { handleSuccess, handleError } = useAlert();

  // Separate state for tag and query_date
  const [tag, setTag] = useState('main');
  const [queryDate, setQueryDate] = useState(formatResultDate(todayDate));
  const [isEditBetOpen, setIsEditBetOpen] = useState(false);
  const [changeBetData, setChangeBetData] = useState(null);

  const [selectDate, setSelectDate] = useState(dayjs(todayDate));
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [declareResultListData, setDeclareResultListData] = useState([]);

  const prevValuesRef = useRef({ tag, queryDate });

  const getColumnHeaders = () => {
    switch (tag) {
      case 'starline':
        return [
          { id: 'user_name', label: 'User Name' },
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
          { id: 'user_name', label: 'User Name' },
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
          { id: 'user_name', label: 'User Name' },
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


  const handleTableDateSelect = useCallback((e) => {
    const newDate = formatResultDate(e.$d);
    setSelectDate(dayjs(e.$d));
    setQueryDate(newDate);
  }, []);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
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

  const notFound = !!filterName && dataFiltered.length === 0;

  // Debounce function for fetching data to avoid too frequent calls
  const fetchData = debounce(async () => {
    try {
      const res = await bidHistoryApi({ user_info: true, tag, query_date: queryDate });
      handleSuccess(res?.message || 'Success');
      setDeclareResultListData(res?.data || []);
    } catch (e) {
      handleError(e?.response?.data?.message || 'Error occurred');
    }
  }, 100);

  // Initial load effect to fetch data immediately on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await bidHistoryApi({ user_info: true, tag, query_date: queryDate });
        handleSuccess(res?.message || 'Success');
        setDeclareResultListData(res?.data || []);
      } catch (e) {
        handleError(e?.response?.data?.message || 'Error occurred');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    if (prevValuesRef.current.tag !== tag || prevValuesRef.current.queryDate !== queryDate) {
      fetchData();
      prevValuesRef.current = { tag, queryDate };
    }
  }, [tag, queryDate, fetchData]);
    
  const openEditBetModal = (data) => {
    setChangeBetData(data);
    setIsEditBetOpen(true);
  };
  
  const closeEditBetModal = () => {
    setIsEditBetOpen(false);
    fetchData();
  };


  const editBet = (
    <PuspaModalEditBet betData={changeBetData} isOpen={isEditBetOpen} onClose={closeEditBetModal} />
  );
  const downloadPDF = () => {
    /* eslint-disable new-cap */
    const doc = new jsPDF();
    const columns = [
      { header: 'User Name', dataKey: 'user_name' },
      { header: 'Game Name', dataKey: 'market_name' },
      { header: 'Game Type', dataKey: 'game_mode' },
      { header: 'Session', dataKey: 'session' },
      { header: 'Open Panna', dataKey: 'open_panna' },
      { header: 'Open Digit', dataKey: 'open_digit' },
      { header: 'Close Panna', dataKey: 'close_panna' },
      { header: 'Close Digit', dataKey: 'close_digit' },
      { header: 'Points', dataKey: 'points' },
      { header: 'Created At', dataKey: 'createdAt' },
    ];

    const rows = declareResultListData.map((row) => ({
      user_name: row?.user_id?.user_name,
      market_name: row.market_name,
      game_mode: row.game_mode,
      session: row.session,
      open_panna: row.open_panna,
      open_digit: row.open_digit,
      close_panna: row.close_panna,
      close_digit: row.close_digit,
      points: row.points,
      createdAt: formatDate(row.createdAt),
    }));

    doc.autoTable({
      columns,
      body: rows,
      margin: { top: 10 },
      styles: { fontSize: 8 },
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save('user_bid_history.pdf');
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">All User Bid History</Typography>
        <Button variant="contained" color="inherit" onClick={downloadPDF}>
          Download PDF
        </Button>
      </Stack>

      <Card>
        <PuspaTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          selectTableDate={selectDate}
          handleTableDateSelect={handleTableDateSelect}
          handleSelectMarket={setTag} // Updated to setTag directly
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table className="responsive-table">
              <PuspaTableHead
                order={order}
                orderBy={orderBy}
                rowCount={declareResultListData.length}
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
                      user_name={row?.user_id?.user_name}
                      market_name={row.market_name}
                      game_mode={row.game_mode}
                      session={row.session}
                      open_panna={row.open_panna}
                      open_digit={row.open_digit}
                      close_panna={row.close_panna}
                      close_digit={row.close_digit}
                      points={row.points}
                      win={row.win}
                      market_id={row.market_id}
                      marketValue={tag}
                      createdAt={row.createdAt}
                      openEditBetModal={openEditBetModal}
                    />
                  ))}

                <PuspaTableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, declareResultListData.length)}
                />

                {notFound && <PuspaTableNoData query={filterName} />}
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
      {editBet}
    </Container>
  );
}
