import { useMemo } from "react";
import likeIcon from "../assets/like-icon.svg";
import { squirrelImages } from "@/utils/squirrelImages";

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

const SquirrelProfile: React.FC<Squirrel> = ({
  squirrelUUID,
  squirrelName,
  primaryFurColor,
  age,
  actions,
  location,
  isFavorited,
  onToggleFavorite,
}) => {

    const randomImage = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * squirrelImages.length);
        return squirrelImages[randomIndex];
      }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="relative h-64 bg-gradient-to-r from-amber-100 to-amber-200 rounded mb-4">
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <img
            src={randomImage || "/default-avatar.png"}
            className="h-52 w-52 object-cover rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      <div className="mt-20 text-center">
        <h1 className="text-3xl font-bold mb-2">{squirrelName || "Unknown"}</h1>
      </div>

      <section className="profile-body text-center">
        <p className="text-orange-950">
          <span className="font-semibold">Age:</span> {age || "Unknown"}
        </p>
        <p className="text-orange-950">
          <span className="font-semibold">Fur Color:</span>{" "}
          {primaryFurColor || "Unknown"}
        </p>
        <p className="text-orange-950">
          <span className="font-semibold">Location:</span> {location || "Unknown"}
        </p>
        <p className="text-orange-950">
          <span className="font-semibold">Actions:</span>{" "}
          {actions && actions.length > 0 ? actions.join(", ") : "Unknown"}
        </p>
      </section>

      <div className="mt-4 flex justify-center">
        <button
          onClick={() => onToggleFavorite(squirrelUUID)}
          className="flex items-center justify-center p-2 rounded-full transition-colors duration-300"
          style={{ backgroundColor: isFavorited ? "#451a03" : "#fbbf24" }}
        >
          <img src={likeIcon} alt="Like" className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default SquirrelProfile;
