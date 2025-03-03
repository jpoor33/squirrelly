import React, { useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import SquirrelCard from '@/components/SquirrelCard';
import { fetchSquirrels } from '@/utils/api';

interface Squirrel {
  squirrelUUID: string;
  squirrelName: string;
  primaryFurColor: string;
  age: string;
  actions: string[];
  location: string;
}

const SquirrelList: React.FC = () => {
  // For demonstration, we're creating an array of 10 items.
  const [squirrels, setSquirrels] = useState<Squirrel[]>([]);

  useEffect(() => {
    // Generate 10 dummy items (you can replace this with your fetched data)
    const getSquirrels = async () => {
      const data = await fetchSquirrels();
      setSquirrels(data);
    };

    getSquirrels();
  
  },[]);


  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <SearchBar onSearch={(query) => console.log('Search query:', query)} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {squirrels.map((squirrel) => (
          <SquirrelCard key={squirrel.squirrelUUID} {}/>
        ))}
      </div>
    </div>
  );
};

export default SquirrelList;
