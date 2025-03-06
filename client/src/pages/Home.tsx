import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import SearchBar from "@/components/SearchBar";
import SquirrelCard from "@/components/SquirrelCard";
import { GET_SQUIRRELS, GET_USER_FAVORITES } from "@/utils/queries";
import { ADD_FAV_SQUIRREL } from "@/utils/mutations";
import { squirrelImages } from "@/utils/squirrelImages";

interface Squirrel {
  squirrelUUID: string;
  squirrelName: string;
  primaryFurColor: string;
  age: string;
  actions: string[];
  location: string;
  isFavorited: boolean;
}

const Home: React.FC = () => {

  const storedUserProfile = localStorage.getItem("userProfile");
  const userProfile = storedUserProfile ? JSON.parse(storedUserProfile) : null;
  const username = userProfile ? userProfile.username : "";

  const { loading: squirrelsLoading, data: squirrelsData } = useQuery(GET_SQUIRRELS);
  const { loading: favoritesLoading, data: favoritesData, refetch } = useQuery(GET_USER_FAVORITES, {
    variables: { username },
  });
  const [addFavSquirrel] = useMutation(ADD_FAV_SQUIRREL, {
    onCompleted: () => refetch(),
  });

  const [searchResults, setSearchResults] = useState<Squirrel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  if (squirrelsLoading || favoritesLoading) {
    return <div>Loading...</div>;
  }

  const SquirrelArray: Squirrel[] = squirrelsData?.getSquirrels || [];
  const userFavorites: string[] =
    favoritesData?.getUserFavorites?.map((sq: { squirrelUUID: string }) => sq.squirrelUUID) || [];

  const dataToDisplay = searchResults.length > 0 ? searchResults : SquirrelArray;

  const pageSize = 6;
  const totalPages = Math.ceil(SquirrelArray.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentSquirrels =
    searchResults.length > 0 ? dataToDisplay : SquirrelArray.slice(startIndex, startIndex + pageSize);

  const shuffledImages = [...squirrelImages].sort(() => Math.random() - 0.5);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleToggleFavorite = async (squirrelUUID: string) => {
    await addFavSquirrel({ variables: { username, squirrelUUID } });
  };

  const handleSearchQuery = (query: string) => {
    if (!query) {
      setSearchResults([]);
      setCurrentPage(1);
      return;
    }
    const filtered = SquirrelArray.filter((squirrel) =>
      squirrel.squirrelName.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-8 min-h-screen">
      <div className="mb-8">
        <SearchBar onSearch={handleSearchQuery} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {currentSquirrels.map((squirrel, index) => (
          <SquirrelCard
            key={squirrel.squirrelUUID}
            squirrelUUID={squirrel.squirrelUUID}
            squirrelName={squirrel.squirrelName}
            squirrelImage={shuffledImages[index % shuffledImages.length]}
            primaryFurColor={squirrel.primaryFurColor}
            age={squirrel.age}
            actions={squirrel.actions}
            location={squirrel.location}
            isFavorited={userFavorites.includes(squirrel.squirrelUUID)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>

      {searchResults.length === 0 && (
        <div className="flex justify-center items-center mt-8 gap-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            style={{ fontFamily: "'Bagel Fat One', cursive", color: "var(--primary)" }}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
          >
            &lt;
          </button>
          <span className="text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            style={{ fontFamily: "'Bagel Fat One', cursive", color: "var(--primary)" }}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
