import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { showWinnerGaliResultApi } from 'src/apis/resultApi';

import Scrollbar from 'src/components/scrollbar';

import { emptyRows } from '../utils';
import PuspaModalEditBet from './puspa-modal-edit-bet';
import PuspaTableRow from '../puspa-table/puspa-table-row';
import PuspaTableHead from '../puspa-table/puspa-table-head';
import PuspaTableNoData from '../puspa-table/puspa-table-no-data';
import PuspaTableEmptyRows from '../puspa-table/puspa-table-empty-rows';

export default function PuspaModalView({ isOpen, onClose, declareResultData }) {

  const [resData, setResData] = useState();
  const [resultData, setResultData] = useState([]);
  const [changeBetData, setChangeBetData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isEditBetOpen, setIsEditBetOpen] = useState(false);

  useEffect(() => {
    if (isOpen || isEditBetOpen) {
      const fetchData = async () => {
        try {
          const result = await showWinnerGaliResultApi(declareResultData);
          setResData(result)
          setResultData(result.data || []);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [isOpen, isEditBetOpen, declareResultData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openEditBetModal = (data) => {
    setChangeBetData(data);
    setIsEditBetOpen(true);
  };

  const closeEditBetModal = () => {
    setIsEditBetOpen(false);
  };

  const editBet = (
    <PuspaModalEditBet
      betData={changeBetData}
      isOpen={isEditBetOpen}
      onClose={closeEditBetModal}
    />
  );

  const notFound = resultData.length === 0;

  return (
    <>
      <Modal
        scroll="body"
        sx={{ overflow: 'scroll' }}
        disableScrollLock
        open={isOpen}
        onClose={onClose}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 24,
            width: { xs: '90%', sm: '90%', md: '90%' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '0px solid lightgray',
              p: 2,
            }}
          >
            <Typography variant="h6">Winner List</Typography>
            <IconButton onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              alignContent: 'flex-start',
              borderBottom: '0px solid lightgray',
              p: 2,
            }}
          >
            <Typography variant="h6">Total Bid Ammount: {resData?.total_bet_amount}</Typography>
            <Typography variant="h6">Total Wining Ammount: {resData?.total_winning_amount}</Typography>
          </Box>
          <Card sx={{ p: 3, borderRadius: '10px' }}>
            <Scrollbar>
              <TableContainer sx={{ overflow: 'unset' }}>
                <Table sx={{ minWidth: 800 }}>
                  <PuspaTableHead
                    headLabel={[
                      { id: 'user_name', label: 'User' },
                      { id: 'market_name', label: 'Market' },
                      { id: 'game_mode', label: 'Game Type' },
                      { id: 'open_digit', label: 'Open Digit' },
                      { id: 'close_digit', label: 'Close Digit' },
                      { id: 'bet_amount', label: 'Bet Point' },
                      { id: 'winning_amount', label: 'Winning Amount' },
                      { id: '' },
                    ]}
                  />
                  <TableBody>
                    {resultData
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <PuspaTableRow
                          key={row._id}
                          id={row._id}
                          user_name={row.user_id.user_name}
                          market_name={row.market_name}
                          game_mode={row.game_mode}
                          open_digit={row.open_digit}
                          close_digit={row.close_digit}
                          bet_amount={row.bet_amount}
                          winning_amount={row.winning_amount}
                          user_id={row.user_id}
                          selected={resultData.indexOf(row.name) !== -1}
                          openEditBetModal={openEditBetModal}
                        />
                      ))}
                    <PuspaTableEmptyRows height={77} emptyRows={emptyRows(page, rowsPerPage, resultData.length)} />
                    {notFound && <PuspaTableNoData />}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
            <TablePagination
              page={page}
              component="div"
              count={resultData.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Box>
      </Modal>
      {editBet}
    </>
  );
}

PuspaModalView.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  declareResultData: PropTypes.any,
};
