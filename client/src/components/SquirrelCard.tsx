import { Link } from "react-router-dom";
import likeIcon from "@/assets/like-icon.svg"
interface Squirrel {
  squirrelUUID: string;
  squirrelName: string;
  squirrelImage: string;
  primaryFurColor: string;
  age: string;
  actions: string[];
  location: string;
  isFavorited: boolean;
  onToggleFavorite: (squirrelUUID: string) => void;
}

//needs to be styled as a card
const SquirrelCard: React.FC<Squirrel> = ({ squirrelUUID, squirrelName, squirrelImage, primaryFurColor, age, actions, location, isFavorited, onToggleFavorite }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between transform transition-all duration-300 hover:bg-amber-100 hover:shadow-xl hover:-translate-y-1 hover:scale-105"
    >
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
      <button onClick={() => onToggleFavorite(squirrelUUID)}>
      {isFavorited ? "Favorited" : "Favorite?"}
          <img src={likeIcon} alt="Like" className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default SquirrelCard;

