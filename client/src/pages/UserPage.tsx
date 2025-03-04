import { useEffect, useState, ChangeEvent, useRef } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import editIcon from '@/assets/edit-icon.svg';
import styles from './User.module.css';

interface UserData {
  name: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
}

const User: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setUser(JSON.parse(storedProfile));
    }
  }, []);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("File selected:", file);
      const newAvatarUrl = URL.createObjectURL(file);
      console.log("Generated new avatar URL:", newAvatarUrl);
      if (user) {
        const updatedUser = { ...user, avatarUrl: newAvatarUrl };
        setUser(updatedUser);
        localStorage.setItem('userProfile', JSON.stringify(updatedUser));
        console.log("User profile updated in state and localStorage.");
      }
    }
  };

  if (!user) {
    return <div className="p-8">No user data available</div>;
  }
  return (
    <div className="container mx-auto p-4">
      <div className="relative h-64 bg-gradient-to-r from-amber-100 to-amber-200 rounded mb-4">
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="relative inline-block">
          <img
              src={user.avatarUrl || '/default-avatar.png'}
              className="h-48 w-48 object-cover rounded-full border-4 border-white shadow-lg"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className={styles.avatarEditButton}>
                <img src={editIcon} alt="Edit Avatar" className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <label
                    onClick={() => {
                      console.log("Edit Avatar clicked");
                      fileInputRef.current?.click();
                    }}
                    className="cursor-pointer"
                  >
                    Edit Avatar
                  </label>
                </DropdownMenuItem>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
        {user.bio && <p className="text-gray-700 mb-4">{user.bio}</p>}
        <p className="text-gray-900">Email: {user.email}</p>
      </div>
    </div>
  );
};

export default User;