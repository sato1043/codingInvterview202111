import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import useStore from '../store';

const Home: React.VFC = () => {
  const { user } = useStore();
  return (
    <div>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js v5 example
          </Typography>
          <div>user.fullName: {user ? user.fullName : '(...now loading)'}</div>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
