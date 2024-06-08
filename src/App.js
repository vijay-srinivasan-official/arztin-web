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
import PendingAppointments from './Pages/MyAppointments/PendingAppointments.js';
import { AuthProvider } from './Auth/AuthContext';
import Dashboard from './Pages/Dashboard/Dashboard.js';
import Register from './Pages/Register/Register.js';
import UpcomingAppointments from './Pages/MyAppointments/UpcomingAppointments.js';

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
                {/* <Route path="/about" element={<DoctorList />} />
                <Route path="/contact" element={<DoctorList />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<ProtectedRoute></ProtectedRoute>}>
                  <Route element={<PendingAppointments></PendingAppointments>} exact path='/pending-appointments'></Route>
                  <Route element={<UpcomingAppointments></UpcomingAppointments>} exact path='/upcoming-appointments'></Route>
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
