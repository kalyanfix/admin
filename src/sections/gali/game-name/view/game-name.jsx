import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// import { users } from 'src/_mock/user';
import Loader from 'src/loader/loader'; // Import the generic Loader component
import { fetchMarkets } from 'src/_mock/marketList';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import PuspaModal from '../modal/puspa-modal';
import PuspaTableRow from '../puspa-table-row';
import PuspaTableHead from '../puspa-table-head';
import PuspaTableNoData from '../puspa-table-no-data';
import PuspaTableToolbar from '../puspa-table-toolbar';
import PuspaDayOffModal from '../modal/puspa-modal-off';
import PuspaTableEmptyRows from '../puspa-table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function GaliGameNamePage() {
  const [loading, setLoading] = useState(false); // State for loading

  const [markets, setMarkets] = useState([]); // State to hold the list of users

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // True if editing
  const [editData, setEditData] = useState(null); // Holds data for editing

  const [isDayModalOpen, setIsDayModalOpen] = useState(false);
  const [dayModal, setDayModal] = useState(null); // Holds data for editing

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleToggle = async () => {
    // Fetch data to update the table after toggle
    setLoading(true); // Start loading
    try {
      const marketData = await fetchMarkets('galidisawar'); // Fetch users from the function
      setMarkets(marketData); // Store the users in state
    } catch (err) {
      // console.log(err); // Store any error in state
    } finally {
      setLoading(false); // End loading
    }
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setEditData(null);
    setIsModalOpen(true);
  };

  const openEditModal = (data) => {
    setIsEditMode(true);
    setEditData(data); // Pass the data to be edited
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditData(null); // Clear edit data when closing
  };

  const openDayModal = (data) => {
    setDayModal(data);
    setIsDayModalOpen(true);
  };

  const closeDayModal = () => {
    setIsDayModalOpen(false);
    setDayModal(null); // Clear edit data when closing
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const marketData = await fetchMarkets("galidisawar"); // Fetch users from the function
        // console.log('marketData: ', marketData);
        setMarkets(marketData); // Store the users in state
      } catch (err) {
        // console.log(err); // Store any error in state
      } finally {
        setLoading(false); // End loading
      }
    };
    // Call API when component mounts or when modal is closed
    if (!isModalOpen || !isDayModalOpen) {
      fetchData(); // API call when modal is closed
    }
  }, [isModalOpen, isDayModalOpen]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = markets.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    // console.log(event);
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
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: markets,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Gali-Di-Sawar Game List</Typography>

        <Button
          variant="contained"
          onClick={openAddModal}
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New Market
        </Button>

        <PuspaModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={isEditMode ? 'Edit Game' : 'Add Game'}
          isEditMode={isEditMode} // Prop to indicate if in edit mode
          editData={editData} // Data to populate the modal when editing
        />

        <PuspaDayOffModal 
          isOpen={isDayModalOpen}
          onClose={closeDayModal}
          dayOffData={dayModal}
        />
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
                rowCount={markets.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'id', label: '#' },
                  { id: 'name', label: 'Name' },
                  { id: 'name_hindi', label: 'Hindi Name' },
                  // { id: 'open_time', label: 'Open Time' },
                  { id: 'close_time', label: 'Close Time' },
                  { id: 'active', label: 'Active' },
                  { id: 'market_status', label: 'Market Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <PuspaTableRow
                      key={row.id}
                      id={row.id}
                      market_id={row.market_id}
                      name={row.name}
                      name_hindi={row.name_hindi}
                      // open_time={row.open_time}
                      close_time={row.close_time}
                      status={row.active}
                      market_status={row.market_status}
                      market_off_day={row.market_off_day}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      handleToggle={handleToggle}
                      openEditModal={openEditModal}
                      openDayModal={openDayModal}
                    />
                  ))}

                <PuspaTableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, markets.length)}
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
          count={markets.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
