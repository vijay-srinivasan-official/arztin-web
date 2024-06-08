import './Header.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth/AuthContext';
import Login from '../../Pages/Login/Login';

const Header = () => {
  // const navigate = useNavigate();
  const { isAuthenticated, authLogout } = useAuth();

  const handleLogout = () => {
    localStorage.clear();
    // setIsAuthenticated(false);
    authLogout();
    window.location.reload();
  };

  const login = () => {

  };

  return (
    <header className="header">
      <div className='company-title'>
        <a href='/'><img src="arztin-logo.svg" alt="Company Logo" className="logo" />
          <img src="arztin.svg" alt="Company Logo" className="logo" /></a>
      </div>
      <nav>
        <ul>
          {isAuthenticated ? (
            <div className='d-flex gap-2 justify-content-center align-items-center'>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><div className='d-flex flex-direction-column'>({localStorage.getItem("userName")})</div></li>
              <li>
                <span className='logout' onClick={handleLogout}><i class="fa-duotone fa-right-from-bracket"></i></span>
              </li>
            </div>
          ) : (
            <div className='d-flex gap-2 justify-content-center align-items-center'>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/login">
                <Button variant="primary" onClick={login}>
                  Login
                </Button></a>
              </li>
              <li><a href="/register">
                <Button variant="outline-primary">Register</Button>{' '}
              </a>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;