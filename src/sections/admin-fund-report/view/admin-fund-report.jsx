import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
// import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Loader from 'src/loader/loader';
import { transactionHistoryApi } from 'src/apis/transactionApi';

import Scrollbar from 'src/components/scrollbar';

import PuspaTableRow from '../table-row';
import PuspaTableHead from '../table-head';
import PuspaTableNoData from '../table-no-data';
import PuspaTableToolbar from '../table-toolbar';
import PuspaTableEmptyRows from '../table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function AdminFundReportPage() {
  const [loading, setLoading] = useState(false);

  const [adminData, setAdminData] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Call the API function with the desired data
        const result = await transactionHistoryApi({ type: 'transfer' });
        setAdminData(result?.data); // Assuming the API returns an object with a 'data' property
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData(); // API call when modal is closed
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

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

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Admin Report List</Typography>

        {/* <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button> */}
      </Stack>

      <Card>
        <PuspaTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
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
                    { id: 'transfer_type', label: 'Type' },
                    { id: 'note', label: 'Note' },
                    { id: 'prev_balance', label: 'Prev. Balance' },
                    { id: 'current_balance', label: 'Current Balance' },
                    { id: 'updatedAt', label: 'Date' },
                    { id: 'status', label: 'Status' },
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
                        prev_balance={row?.prev_balance}
                        current_balance={row?.current_balance}
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
    </Container>
  );
}
