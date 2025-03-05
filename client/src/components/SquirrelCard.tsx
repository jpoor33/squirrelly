import { useMutation } from "@apollo/client";
import { FAV_SQUIRREL } from "@/utils/mutations";
import likeIcon from '@/assets/like-icon.svg';
import styles from '../pages/User.module.css';
import { Link } from "react-router-dom";

interface Squirrel {
  userUUID: string;
  squirrelUUID: string;
  squirrelName: string;
  primaryFurColor: string;
  age: string;
  actions: string[];
  location: string;
  cardWidth?: string;
  cardHeight?: string;
  squirrelImage: string;
}

const SquirrelCard: React.FC<Squirrel> = ({
  userUUID,
  squirrelUUID,
  squirrelName,
  primaryFurColor,
  age,
  actions,
  location,
  cardWidth = "300px",  
  cardHeight = "450px",
  squirrelImage,
}) => {
  const [addFavorite, { error }] = useMutation(FAV_SQUIRREL);

  const favoriteSquirrel = async () => {
    try {
      await addFavorite({
        variables: { userUUID, squirrelUUID },
      });
    } catch (err: any) {
      console.error("Error favoriting Squirrel:", err.message);
    }
  };

  return (
    <div 
    style={{ width: cardWidth, height: cardHeight }}
    className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between transform transition-all duration-300 hover:bg-amber-100 hover:shadow-xl hover:-translate-y-1 hover:scale-101">
      <Link to={`/squirrelprofile/${squirrelUUID}`} className="block">
      <img
        src={squirrelImage}
        alt="Squirrel"
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-amber-800">{squirrelName}</h1>
      </div>
      </Link>
      <div className="space-y-2">
        <p className="text-orange-950">
          <span className="font-semibold">Age:</span> {age}
        </p>
        <p className="text-orange-950">
          <span className="font-semibold">Fur Color:</span> {primaryFurColor}
        </p>
        <p className="text-orange-950">
          <span className="font-semibold">Location:</span> {location}
        </p>
        <p className="text-orange-950">
          <span className="font-semibold">Actions:</span> {actions.join(", ")}
        </p>
      </div>
      <div className="mt-4 flex justify-center">
      <button
          onClick={favoriteSquirrel}
           className={`${styles.customLikeButton} flex items-center justify-center hover:bg-amber-700 transition-colors duration-300`}
        >
          <img src={likeIcon} alt="Like" className="h-6 w-6" />
        </button>
      </div>
      {error && (
        <div className="mt-4 bg-red-500 text-white p-2 rounded">
          Something went wrong...
        </div>
      )}
    </div>
  );
};

export default SquirrelCard;
