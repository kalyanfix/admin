// theme/index.jsx
import PropTypes from 'prop-types';
import { useMemo, useState, createContext } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { palette } from './palette';
import { shadows } from './shadows';
import { overrides } from './overrides';
import { typography } from './typography';
import { customShadows } from './custom-shadows';

// Create a context for managing opacity
export const OpacityContext = createContext({
  opacity: 1,
  setOpacity: () => {},
});

export default function ThemeProvider({ children }) {
  const [opacity, setOpacity] = useState(1); // Initialize opacity state

  const memoizedValue = useMemo(
    () => ({
      palette: palette(),
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
      zIndex: { modal: 1300 },
    }),
    []
  );

  const theme = createTheme(memoizedValue);

  theme.components = {
    ...overrides(theme),
    MuiLink: {
      styleOverrides: {
        root: {
          '&[disabled]': {
            color: theme.palette.action.disabled,
            pointerEvents: 'none',
          },
        },
      },
    },
  };

  // Memoize the context value to prevent unnecessary re-renders
  const opacityContextValue = useMemo(() => ({ opacity, setOpacity }), [opacity]);

  return (
    <OpacityContext.Provider value={opacityContextValue}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ opacity }}>{children}</div> {/* Apply opacity to all children */}
      </MUIThemeProvider>
    </OpacityContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
