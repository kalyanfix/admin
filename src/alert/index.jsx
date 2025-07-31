import PropTypes from 'prop-types';
import React, { useMemo, useState, useContext, createContext } from 'react';

import Grow from '@mui/material/Grow';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const AlertContext = createContext({
  alert: null, // Object containing { type, message }
  open: false, // Flag to control Snackbar visibility
  closeAlert: () => {}, // Function to close the alert
});

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const [open, setOpen] = useState(false);

  const closeAlert = () => {
    setOpen(false);
    setAlert(null); // Clear alert data after closing
  };

  //   const showAlert = (type, message) => {
  //     setAlert({ type, message });
  //     setOpen(true);
  //   };

  const value = useMemo(
    () => ({
      alert: null,
      open: false,
      closeAlert: () => {
        setOpen(false);
        setAlert(null);
      },
      showAlert: (type, message) => {
        setAlert({ type, message });
        setOpen(true);
      },
    }),
    []
  );

  return (
    <AlertContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={1000}
        TransitionComponent={Grow}
        key={Grow.name}
        onClose={closeAlert}
        anchorOrigin={{
            vertical: "top",
            horizontal: "right"
         }}
      >
        {alert && (
          <Alert severity={alert.type} onClose={closeAlert}>
            {alert.message}
          </Alert>
        )}
      </Snackbar>
    </AlertContext.Provider>
  );
};

AlertProvider.propTypes = {
  children: PropTypes.node,
};

const useAlert = () => {
  const { showAlert } = useContext(AlertContext);

  const handleError = (error) => {
    showAlert('error', error?.message || error || 'An error occurred.');
  };

  const handleInfo = (message) => {
    showAlert('info', message);
  };

  const handleSuccess = (message) => {
    showAlert('success', message);
  };

  return { handleError, handleInfo, handleSuccess };
};

export { useAlert, AlertProvider };
