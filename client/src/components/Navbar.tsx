import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import squirrelIcon from '@/assets/squirrel.svg';
import userIcon from '@/assets/user-icon.svg';
import styles from './Navbar.module.css';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {

  const token = localStorage.getItem('loginToken') || 'dummy-token';
  // const token = localStorage.getItem('loginToken');
  const location = useLocation();
  const navigate = useNavigate();

  
  const handleLogout = () => {
    localStorage.removeItem('loginToken');
    navigate('/signin');
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100">
      <div className="flex items-center space-x-2">
      <Link to="/" className="cursor-pointer">
        <img src={squirrelIcon} alt="Squirrel Logo" className="h-12 w-12" />
      </Link>
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
            <Link to="/about">
              <Button variant="link" className={styles.navbarButton}>
                About us
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className={styles.navbarButton}>
                  <img
                    src={userIcon}
                    alt="User Icon"
                    className="h-12 w-12 cursor-pointer"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
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
