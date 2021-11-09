import createCache, { EmotionCache } from '@emotion/cache';
import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export function createEmotionCache(): EmotionCache {
  return createCache({ key: 'css' });
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: ['"noto-sans-jp"', '"sans-serif"'].join(','),
  },
});

export default theme;
