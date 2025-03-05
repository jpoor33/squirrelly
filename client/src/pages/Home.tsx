import { useState } from "react";
// import { useQuery } from '@apollo/client';
import SearchBar from '@/components/SearchBar';
// import SquirrelCard from '@/components/SquirrelCard';
// import { GET_SQUIRRELS } from '@/utils/queries';
import DummySquirrelCard from "@/components/DummyCard";
import { squirrelImages } from "@/utils/squirrelImages";

// interface Squirrel {
//   squirrelUUID: string;
//   squirrelName: string;
//   primaryFurColor: string;
//   age: string;
//   actions: string[];
//   location: string;
// }

const Home: React.FC = () => {

  const dummySquirrels = Array.from({ length: 24 }, (_, i) => ({
    userUUID: `user-${i}`,
    squirrelUUID: `squirrel-${i}`,
    squirrelName: `Malcolm ${i + 1}`,
    primaryFurColor: i % 2 === 0 ? 'Brown' : 'Gray',
    age: `${i + 1} years`,
    actions: ['running', 'jumping'],
    location: 'Central Park',
  })); 

  const shuffledImages = [...squirrelImages].sort(() => Math.random() - 0.5);
  
  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(dummySquirrels.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const currentSquirrels = dummySquirrels.slice(startIndex, startIndex + pageSize);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
      <div className="container mx-auto min-h-screen p-4">
         <div className="flex flex-wrap gap-4 justify-center">
           <SearchBar onSearch={(query) => console.log('Search query:', query)} />
         </div>
         <div className="grid grid-cols-3 gap-4">
        {currentSquirrels.map((squirrel, index) => (
          <DummySquirrelCard
            key={index}
            squirrelImage={shuffledImages[index % shuffledImages.length]}
            {...squirrel}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-8 gap-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={{ fontFamily: "'Bagel Fat One', cursive", color: 'var(--primary)' }}
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
          style={{ fontFamily: "'Bagel Fat One', cursive", color: 'var(--primary)' }}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
      </div>
  );
};

 {/* const SquirrelList: React.FC = () => {

//   const { loading, data } = useQuery(GET_SQUIRRELS);

  
//   const SquirrelArray: Squirrel[] = data?.getSquirrels || [];

//   if (loading) {
//     return <div>Squirrel data is loading...</div>;
//   }
//Searchbar back here
//       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {SquirrelArray.map((squirrel) => (
//           <SquirrelCard userUUID={"test"} squirrelUUID={squirrel.squirrelUUID} squirrelName={squirrel.squirrelName} primaryFurColor={squirrel.primaryFurColor} age = {squirrel.age} location = {squirrel.location} actions={squirrel.actions}/>
//         ))}
//       </div>
//     </div>
    
//   ); */}

export default Home;
