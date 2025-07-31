// Loader.js
import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

const Loader = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '150px' }}
      >
        <div className="container">
          <div className="dot"/>
          <div className="traveler"/>
        </div>
        <svg width="0" height="0" className="svg">
          <defs>
            <filter id="uib-jelly-triangle-ooze">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.333" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="ooze"
              />
              <feBlend in="SourceGraphic" in2="ooze" />
            </filter>
          </defs>
        </svg>
      </Box>
    );
  }
  return children;
};

Loader.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node,
};

export default Loader;
