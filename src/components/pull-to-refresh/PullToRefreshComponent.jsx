import React from 'react';
import PropTypes from 'prop-types';
import PullToRefresh from 'react-simple-pull-to-refresh';

import CircularProgress from '@mui/material/CircularProgress';

const PullToRefreshComponent = ({ children }) => {
  const handleRefresh = () =>
    new Promise((resolve) => {
      window.location.reload();
      resolve();
    });

  return (
    <PullToRefresh
      onRefresh={handleRefresh}
      refreshingContent={<CircularProgress color="secondary" />}
    >
      {children}
    </PullToRefresh>
  );
};

PullToRefreshComponent.propTypes = {
  children: PropTypes.node,
};

export default PullToRefreshComponent;
