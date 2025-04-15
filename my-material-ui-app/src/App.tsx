import React from 'react';
import {
  Button,
  Typography,
  Container,
  CssBaseline,
  Box,
  Stack,
  ThemeProvider,
  createTheme
} from '@mui/material';
import UserCard from './components/UserCard';
import Playground from './components/Playground';
import Header from './components/Header';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
  },
});

function App() {
  const handleContact = () => {
    alert('Contact button clicked!');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Our Team
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <UserCard
              name="John Doe"
              role="Developer"
              onContact={handleContact}
            />
            <UserCard
              name="Jane Smith"
              role="Designer"
              avatarUrl="https://via.placeholder.com/150"
              onContact={handleContact}
            />
          </Stack>
        </Box>
        <Playground />
        <Button variant="contained" color="success">
          Success
        </Button>
      </Container>

    </ThemeProvider>
  );
}

export default App;