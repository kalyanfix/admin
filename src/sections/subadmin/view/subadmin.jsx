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
import { fetchAdmins } from 'src/_mock/user';

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

export default function SubAdminPage() {
  const [loading, setLoading] = useState(false); // State for loading

  const [admins, setAdmins] = useState([]); // State to hold the list of users

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
      const marketData = await fetchAdmins(); // Fetch users from the function
      setAdmins(marketData); // Store the users in state
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
        const marketData = await fetchAdmins(); // Fetch users from the function
        setAdmins(marketData); // Store the users in state
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
      const newSelecteds = admins.map((n) => n.name);
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
    inputData: admins,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Sub Admin</Typography>

        <Button
          variant="contained"
          onClick={openAddModal}
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New Sub Admin
        </Button>

        <PuspaModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={isEditMode ? 'Edit Sub Admin' : 'Add Sub Admin'}
          isEditMode={isEditMode} // Prop to indicate if in edit mode
          editData={editData} // Data to populate the modal when editing
        />

        <PuspaDayOffModal isOpen={isDayModalOpen} onClose={closeDayModal} dayOffData={dayModal} />
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
              <Table className="responsive-table">
                <PuspaTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={admins.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'id', label: '#' },
                    { id: 'name', label: 'Name' },
                    { id: 'user_name', label: 'User Name' },
                    { id: 'mobile', label: 'mobile' },
                    { id: 'createdAt', label: 'Date' },
                    { id: 'status', label: 'Status' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <PuspaTableRow
                        key={index}
                        id={index + 1}
                        admin_id={row._id}
                        name={row.name}
                        user_name={row.user_name}
                        mobile={row.mobile}
                        status={row.status}
                        createdAt={row.createdAt}
                        selected={selected.indexOf(row.name) !== -1}
                        handleClick={(event) => handleClick(event, row.name)}
                        handleToggle={handleToggle}
                        openEditModal={openEditModal}
                        openDayModal={openDayModal}
                      />
                    ))}

                  <PuspaTableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, admins.length)}
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
          count={admins.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
