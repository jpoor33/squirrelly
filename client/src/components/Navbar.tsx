import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import squirrelIcon from '@/assets/squirrel.svg';
import userIcon from '@/assets/useravatar.svg';
import styles from './Navbar.module.css';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const token = localStorage.getItem('loginToken');

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loginToken');
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-amber-200">
      <div className="flex items-center space-x-2">
        <Link to="/">
        <img src={squirrelIcon} alt="Squirrel Logo"
         className={`"h-10 w-10 cursor-pointer ${styles.squirrelIcon}`} />
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
       
        <Link to="/about">
          <Button variant="link" 
           style={{ fontFamily: "'Bagel Fat One', cursive", color: 'var(--primary)' }}
          className={`${styles.navbarButton} text-xl`}>About Us</Button>
        </Link>
        {!token && location.pathname !== "/signin" && (
          <Link to="/login">
            <Button variant="link"
            style={{ fontFamily: "'Bagel Fat One', cursive", color: 'var(--primary)' }}
            className={`${styles.navbarButton} text-xl`}>Log In</Button>
          </Link>
        )}
         {token && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className={styles.navbarButton}>
                  <img
                    src={userIcon}
                    alt="User Icon"
                    className={`"h-10 w-10 cursor-pointer ${styles.squirrelIcon}`}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-46 mt-1 mr-1 bg-amber-50">
              <DropdownMenuItem asChild
                className="hover:text-amber-700">
                  <Link to="/user">My profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                className="hover:text-amber-700"
                onClick={handleLogout}>
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
