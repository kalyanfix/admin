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

import Loader from 'src/loader/loader'; // Import the generic Loader component
import { noticeGetApi } from 'src/apis/noticeApi';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import PuspaModalAddNotice from '../modal/puspa-modal-add-notice';

// ----------------------------------------------------------------------

export default function NoticePage() {
  const [loading, setLoading] = useState(false); // State for loading

  // ===================================== Modal Work =========================

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [viewData, setViewData] = useState()

  const openAddModal = (data) => {
    setViewData(data);
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const [noticeData, SetNoticeData] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchNoticeData = async () => {
      setLoading(true); // Start loading
      try {
        // Fetch users from the function
        await noticeGetApi().then((noticeList) => {
          SetNoticeData(noticeList?.data); // Store the users in state
        });
      } catch (err) {
        // console.log(err); // Store any error in state
      } finally {
        setLoading(false); // End loading
      }
    };
    if(!isAddModalOpen){
      fetchNoticeData();
    }
  }, [isAddModalOpen]);

  const handleToggle = () => {
    noticeGetApi().then((noticeList) => SetNoticeData(noticeList?.data));
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = noticeData.map((n) => n.name);
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
    inputData: noticeData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Popup Mangment</Typography>

        <Button variant="contained" color="inherit" onClick={() => openAddModal()} startIcon={<Iconify icon="eva:plus-fill" />}>
          New Notice
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Loader isLoading={loading}>
              <Table className="responsive-table">
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={noticeData.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'title', label: 'Title' },
                    { id: 'body', label: 'Body' },
                    { id: 'img', label: 'Img' },
                    { id: 'link', label: 'Link' },
                    { id: 'button', label: 'Button' },
                    { id: 'status', label: 'Status' },
                    { id: '' }
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <UserTableRow
                        key={row._id}
                        id={row._id}
                        title={row.title}
                        body={row.body}
                        img={row.link}
                        link={row.url}
                        button={row.button}
                        status={row.status}
                        handleToggle={handleToggle}
                      />
                    ))}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, noticeData.length)}
                  />

                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </Loader>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={noticeData.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <PuspaModalAddNotice 
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        viewData={viewData}
      />
    </Container>
  );
}
