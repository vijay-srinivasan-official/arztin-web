import './Header.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth/AuthContext';

const Header = () => {
  // const history = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // history.push('/login');
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
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
          {isAuthenticated ? (
            <li><Button variant="outline-primary" onClick={handleLogout}>Logout</Button></li>
          ) : (
            <div className='d-flex gap-2'>
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