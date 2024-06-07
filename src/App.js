import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DoctorList from './Pages/Doctors/DoctorList';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import './App.css';
import Login from './Pages/Login/Login';
import ProtectedRoute from './Auth/ProtectedRoute';
import Dashboard from './Pages/Dashboard/Dashboard';
import { AuthProvider } from './Auth/AuthContext';

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

      <div className='main'>
        <AuthProvider>
          <Header />
          <Router>
            <div>
              <Routes>
                {/* <Route path='/dashboard' element={<ProtectedRoute />}>
                <Route path='/dashboard' element={<Dashboard />} />
              </Route> */}
                <Route exact path="/" element={<DoctorList />} />
                <Route path="/about" element={<DoctorList />} />
                <Route path="/contact" element={<DoctorList />} />
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute></ProtectedRoute>}>
                  <Route element={<Dashboard></Dashboard>} exact path='/dashboard'></Route>
                </Route>
              </Routes>
            </div>
          </Router>
          <Footer />
        </AuthProvider>
      </div>

    </ThemeProvider>
  );
};

export default App;
