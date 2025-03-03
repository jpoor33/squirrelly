import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import squirrelIcon from '@/assets/squirrel.svg';

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100">
      <div className="flex items-center space-x-2">
        <img src={squirrelIcon} alt="Squirrel Logo" className="h-8 w-8" />
        <span className="text-xl font-bold">Squirrel Finder</span>
      </div>
      <div className="flex space-x-4">
        <Link to="/">
          <Button variant="link">Home</Button>
        </Link>
        <Link to="/signin">
          <Button variant="link">Sign In</Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="link">Dashboard</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
