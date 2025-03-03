import React, { useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import SquirrelCard from '@/components/SquirrelCard';

const Home: React.FC = () => {
  // For demonstration, we're creating an array of 10 items.
  const [cards, setCards] = useState<number[]>([]);

  useEffect(() => {
    // Generate 10 dummy items (you can replace this with your fetched data)
    const dummyCards = Array.from({ length: 10 }, (_, index) => index);
    setCards(dummyCards);
  }, []);

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <SearchBar onSearch={(query) => console.log('Search query:', query)} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <SquirrelCard key={card} />
        ))}
      </div>
    </div>
  );
};

export default Home;
