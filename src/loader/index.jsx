import React from 'react';

import { Backdrop } from '@mui/material';

import { useLoaderContext } from './contectLoader'; // adjust path as needed

const Loader = () => {
  const { loading } = useLoaderContext();

  return (
    <Backdrop open={loading} style={{ zIndex: 1300, color: '#fff' }}>
      <div className="container">
        <div className="dot" />
        <div className="traveler" />
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
    </Backdrop>
  );
};

export default Loader;
