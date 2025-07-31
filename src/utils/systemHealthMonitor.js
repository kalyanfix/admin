// src/utils/systemHealthMonitor.js
import { useEffect, useContext } from 'react';

import { OpacityContext } from 'src/theme'; // Import the OpacityContext
import systemIntegrityCheck from './networkServiceHandler';

// Function to gradually decrease opacity if the license is inactive
const calculateNewOpacity = (currentOpacity) => {
  const newOpacity = Math.max(currentOpacity - 0.1, 0);
  const roundedOpacity = Math.round(newOpacity * 100) / 100;
  // console.log(`Opacity decreased to: ${roundedOpacity}`); // Debug log
  return roundedOpacity; // Return the rounded opacity value
};

// Function to decrease opacity over time
const decreaseVisibilityOverTime = (setOpacity) => {
  let opacity = 1; // Start with initial full opacity
  setOpacity(opacity); // Set initial opacity

  const interval = setInterval(() => {
    const newOpacity = calculateNewOpacity(opacity); // Get the new opacity value
    setOpacity(newOpacity); // Update opacity state
    opacity = newOpacity; // Update the opacity variable
    // console.log(`New opacity set to: ${newOpacity}`); // Debug log to confirm setting opacity

    if (opacity <= 0) {
      clearInterval(interval); // Stop when opacity reaches 0%
    }
  }, 5000); // 1 hour in milliseconds
};

// Custom hook to monitor system health and adjust opacity
export const useSystemHealthMonitor = () => {
  const { setOpacity } = useContext(OpacityContext); // Use the custom opacity context

  useEffect(() => {
    const checkAndAdjustOpacity = async () => {
      const systemStatus = await systemIntegrityCheck((opacity) => {
        if (opacity !== undefined) {
          setOpacity(opacity); // Update theme's opacity
          // console.log(`System status check: opacity set to ${opacity}`); // Debug log
        }
      });

      if (systemStatus === 'inactive') {
        decreaseVisibilityOverTime(setOpacity); // Gradually decrease opacity if inactive
      }
    };

    checkAndAdjustOpacity();
  }, [setOpacity]);
};
