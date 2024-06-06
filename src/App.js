import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DoctorList from './Pages/Doctors/DoctorList';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    h5: {
      fontWeight: 600,
    },
    body2: {
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <div class="main">
        <DoctorList />
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
