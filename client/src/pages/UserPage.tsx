import { useEffect, useState, ChangeEvent, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import editIcon from '@/assets/edit-icon.svg';
import styles from './User.module.css';
import SquirrelCard from '@/components/SquirrelCard';
import { squirrelImages } from '@/utils/squirrelImage';
import { GET_USER_FAVORITES } from '@/utils/queries';
import { ADD_FAV_SQUIRREL } from '@/utils/mutations';

interface Squirrel {
  userUUID: string;
  squirrelUUID: string;
  squirrelName: string;
  primaryFurColor: string;
  age: string;
  actions: string[];
  location: string;
}

interface UserData {
  username: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
  favorites?: Squirrel[];
}

const User: React.FC = () => {
  const storedUserProfile = localStorage.getItem("userProfile");
  const userProfile = storedUserProfile ? JSON.parse(storedUserProfile) : null;
  const username = userProfile.username;

  
  
  const [user, setUser] = useState<UserData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setUser(JSON.parse(storedProfile));
    }
  }, []);

  
  const { loading, data, error, refetch } = useQuery(GET_USER_FAVORITES, {
    variables: { username },
    skip: !user, 
  });

  const [onToggleFavorite] = useMutation(ADD_FAV_SQUIRREL, {
    onCompleted: () => refetch(),
  });

  
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newAvatarUrl = URL.createObjectURL(file);

      if (user) {
        const updatedUser = { ...user, avatarUrl: newAvatarUrl };
        setUser(updatedUser);
        localStorage.setItem('userProfile', JSON.stringify(updatedUser));
      }
    }
  };

  
  if (!user) {
    return <div className="p-8">No user data available</div>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading favorites.</p>;

  const favoritedSquirrels = data?.getUserFavorites || [];

  const handleToggleFavorite = async (squirrelUUID: string) => {
    try {
      await onToggleFavorite({ variables: { username, squirrelUUID } });
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="container mx-auto min-h-screen p-4">
      <div className="relative h-64 bg-gradient-to-r from-amber-100 to-amber-200 rounded mb-4">
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="relative inline-block">
            <img
              src={user.avatarUrl || '/default-avatar.png'}
              className="h-52 w-52 object-cover rounded-full border-4 border-white shadow-lg"
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
                    onClick={() => fileInputRef.current?.click()}
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

      <div className="mt-20 text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user.username}</h1>
        {user.bio && <p className="text-gray-700 mb-4">{user.bio}</p>}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-center">My Favorite Squirrels</h2>
        {favoritedSquirrels.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favoritedSquirrels.map((squirrel: Squirrel, index: number) => (
              <SquirrelCard
                key={squirrel.squirrelUUID}
                squirrelUUID={squirrel.squirrelUUID}
                squirrelName={squirrel.squirrelName}
                primaryFurColor={squirrel.primaryFurColor}
                age={squirrel.age}
                location={squirrel.location}
                actions={squirrel.actions}
                isFavorited={true}                                 
                onToggleFavorite={handleToggleFavorite}
                squirrelImage={squirrelImages[index % squirrelImages.length]}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">You haven't favorited any squirrels yet.</p>
        )}
      </div>
    </div>
  );
};

export default User;