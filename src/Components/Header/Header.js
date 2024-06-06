import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <img src="logo192.png" alt="Company Logo" className="logo" />
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;