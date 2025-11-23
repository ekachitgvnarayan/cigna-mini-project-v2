import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          💰 Payments Management
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/payments" className={isActive('/payments')}>
              Payments
            </Link>
          </li>
          <li>
            <Link to="/categories" className={isActive('/categories')}>
              Categories
            </Link>
          </li>
          <li>
            <Link to="/audit" className={isActive('/audit')}>
              Audit Trail
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
