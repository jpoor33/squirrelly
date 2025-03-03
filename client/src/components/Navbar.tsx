import { Link, useLocation  } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import squirrelIcon from '@/assets/squirrel.svg';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const token = localStorage.getItem('loginToken');
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100">
      <div className="flex items-center space-x-2">
        <img src={squirrelIcon} alt="Squirrel Logo" className="h-12 w-12" />
        <Link to="/" className="cursor-pointer">
          <span
            className="text-5xl"
            style={{ fontFamily: "'Bagel Fat One', cursive", color: 'var(--primary)' }}
          >
            Squirrelly
          </span>
        </Link>
      </div>
      <div className="flex space-x-4">
        {!token && location.pathname !== "/signin" && (
          <Link to="/signin">
            <Button variant="link" className={styles.navbarButton}>Sign In</Button>
          </Link>
        )}
        {token && (
          <Link to="/dashboard">
            <Button variant="link" className={styles.navbarButton}>Dashboard</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
