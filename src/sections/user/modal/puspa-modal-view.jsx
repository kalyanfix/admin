import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import { capitalizeString } from 'src/utils/format-string';

import { userSpecificApi } from 'src/apis/userApi';

import PuspaCard from '../puspa-card';
import PuspaModalMPIN from './puspa-modal-mpin';
import PuspaModalAddFund from './puspa-modal-add-fund';
import PuspaModalWithDrawFund from './puspa-modal-withdraw-fund';

export default function PuspaModalView({ isOpen, onClose, isEditMode, userIdData }) {
  const [userData, setUserData] = useState(null);
  const [isMpinModalOpen, setIsMpinModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userIdData) {
          const result = await userSpecificApi(userIdData);
          setUserData(result.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (!isMpinModalOpen || !isAddModalOpen || !isWithdrawModalOpen) {
      fetchData();
    }
  }, [userIdData, isMpinModalOpen, isAddModalOpen, isWithdrawModalOpen]);

  const openMpinModal = () => setIsMpinModalOpen(true);
  const closeMpinModal = () => setIsMpinModalOpen(false);
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
  const openWithdrawModal = () => setIsWithdrawModalOpen(true);
  const closeWithdrawModal = () => setIsWithdrawModalOpen(false);

  const modalMpin = (
    <PuspaModalMPIN
      isOpen={isMpinModalOpen}
      onClose={closeMpinModal}
      mobileMpin={userData?.mobile}
      mpin={userData?.mpin}
      name={userData?.user_name}
    />
  );

  const modalAddFund = (
    <PuspaModalAddFund
      isOpen={isAddModalOpen}
      onClose={closeAddModal}
      userIdData={userIdData}
      name={userData?.user_name}
    />
  );

  const modalWithdrawFund = (
    <PuspaModalWithDrawFund
      isOpen={isWithdrawModalOpen}
      onClose={closeWithdrawModal}
      userIdData={userIdData}
      name={userData?.user_name}
    />
  );

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        disableScrollLock
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: {
              xs: '90%', // Width for extra small screens
              sm: '80%', // Width for small screens
              md: '60%', // Width for medium screens
              lg: '40%', // Width for large screens
            },
            maxHeight: '90vh', // Max height to ensure it doesn't exceed viewport height
            overflowY: 'auto', // Allow scrolling if content overflows vertically
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 2, // Padding for content
            outline: 'none', // Removes default focus outline
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid lightgray',
              mb: 2, // Margin bottom to separate the header from the content
            }}
          >
            {/* Title of the modal */}
            <Typography variant="h6">
              {userData?.user_name ? capitalizeString(userData?.user_name) : 'User'}&apos;s Details:
            </Typography>
            {/* Close button */}
            <IconButton onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
          {/* Modal content */}
          <Box>
            {userData && (
              <div>
                {/* Render the PuspaCard component with the fetched data */}
                <PuspaCard
                  userData={userData}
                  openMpinModal={openMpinModal}
                  openAddModal={openAddModal}
                  openWithdrawModal={openWithdrawModal}
                />
              </div>
            )}
          </Box>
        </Box>
      </Modal>
      {modalMpin}
      {modalAddFund}
      {modalWithdrawFund}
    </>
  );
}

PuspaModalView.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  isEditMode: PropTypes.bool,
  userIdData: PropTypes.string,
};
