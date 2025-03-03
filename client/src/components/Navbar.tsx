import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import squirrelIcon from '@/assets/squirrel.svg';
import styles from './Navbar.module.css';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const token = localStorage.getItem('loginToken');
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loginToken');
    navigate('/signin');
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100">
      <div className="flex items-center space-x-2">
        <img src={squirrelIcon} alt="Squirrel Logo" className="h-8 w-8" />
        <Link to="/" className="cursor-pointer">
          <span
            className="text-6xl font-bold"
            style={{ fontFamily: "'Bagel Fat One', cursive", color: 'var(--primary)' }}
          >
            Squirrelly
          </span>
        </Link>
      </div>
      <div className="flex space-x-4">
        <Link to="/">
          <Button variant="link" className={styles.navbarButton}>
            Home
          </Button>
        </Link>
        {/* Only show the Sign In button if not logged in and not already on Sign In page */}
        {!token && location.pathname !== "/signin" && (
          <Link to="/signin">
            <Button variant="link" className={styles.navbarButton}>
              Sign In
            </Button>
          </Link>
        )}
        {/* Only show these when logged in */}
        {token && (
          <>
            <Link to="/dashboard">
              <Button variant="link" className={styles.navbarButton}>
                Dashboard
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className={styles.navbarButton}>
                  {/* Replace this div with your actual avatar if available */}
                  <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white">
                    U
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/favorites">Favorite Squirrels</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
