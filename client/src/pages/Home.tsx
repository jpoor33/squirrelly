import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import SearchBar from '@/components/SearchBar';
import SquirrelCard from '@/components/SquirrelCard';
import { GET_SQUIRRELS } from '@/utils/queries';

interface Squirrel {
  squirrelUUID: string;
  squirrelName: string;
  primaryFurColor: string;
  age: string;
  actions: string[];
  location: string;
}

const SquirrelList: React.FC = () => {

  const { loading, data } = useQuery(GET_SQUIRRELS);
  
  if (loading) {
    return <div>Squirrel data is loading...</div>;
  }

  // For demonstration, we're creating an array of 10 items.
  
  const [squirrels, setSquirrels] = useState<Squirrel[]>([]);

  setSquirrels(data);


  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <SearchBar onSearch={(query) => console.log('Search query:', query)} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {squirrels.map((squirrel) => (
          <SquirrelCard squirrelUUID={squirrel.squirrelUUID} squirrelName={squirrel.squirrelName} primaryFurColor={squirrel.primaryFurColor} age = {squirrel.age} location = {squirrel.location} actions={squirrel.actions}/>
        ))}
      </div>
    </div>
  );
};

export default SquirrelList;
