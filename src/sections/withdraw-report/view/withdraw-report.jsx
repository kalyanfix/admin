import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { formatResultDate, convertResultDateFormat } from 'src/utils/format-time';

import Loader from 'src/loader/loader'; // Import the generic Loader component
import { transactionHistoryApi } from 'src/apis/transactionApi';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../result-table-row';
import UserTableHead from '../result-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../result-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function WithdrawReportPage() {
  // const { handleSuccess, handleError } = useAlert();

  const [loading, setLoading] = useState(false); // State for loading

  const todayDate = new Date();

  const [withdrawData, SetWithdrawData] = useState([]);

  const [selectTableDate, setSelectTableDate] = useState(dayjs(todayDate));

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('updatedAt');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [withdrawlListData, setWithdrawlListData] = useState(formatResultDate(todayDate));

  useEffect(() => {
    const fetchResultData = async () => {
      setLoading(true); // Start loading
      try {
        // Fetch users from the function
        await transactionHistoryApi({
          query_date: withdrawlListData,
          type: 'mobile',
          transfer_type: 'withdrawl',
        }).then((withdrawList) => {
          // console.log('resultList: ', withdrawList);
          SetWithdrawData(withdrawList?.data); // Store the users in state
        }); 
      } catch (err) {
        // console.log(err); // Store any error in state
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchResultData();
  }, [withdrawlListData]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = withdrawData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
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
    // console.log(event.target.value);
    setFilterName(event.target.value);
  };

  const handelTableDateSelect = async (e) => {
    // console.log(e);
    setSelectTableDate(e);
    setWithdrawlListData(convertResultDateFormat(e.$d.toDateString()));
  };

  const dataFiltered = applyFilter({
    inputData: withdrawData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !!filterName;

  const noData = !dataFiltered.length;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Withdraw Report</Typography>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          selectTableDate={selectTableDate}
          handelTableDateSelect={handelTableDateSelect}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Loader isLoading={loading}>
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={withdrawData.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'id', label: '#' },
                    { id: 'user_name', label: 'User' },
                    { id: 'mobile', label: 'Mobile' },
                    { id: 'amount', label: 'Ammount' },
                    { id: 'status', label: 'Status' },
                    { id: 'updatedAt', label: 'Date' },
                    { id: '', label: 'View' },
                    { id: '', label: 'Action' },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <UserTableRow
                        key={index}
                        id={index + 1}
                        amount={row?.amount}
                        user_name={row?.user_id?.user_name}
                        mobile={row?.user_id?.mobile}
                        updatedAt={row.updatedAt}
                        status={row.status}
                        selected={selected.indexOf(row.game) !== -1}
                        handleClick={(event) => handleClick(event, row.game)}
                      />
                    ))}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, withdrawData.length)}
                  />

                  {notFound && noData ? (
                    <TableNoData query={notFound ? filterName : undefined} />
                  ) : null}
                </TableBody>
              </Table>
            </Loader>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={withdrawData.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
