import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchProps {
  onSearch: (query: string) => void; 
}

export default function SearchBar({ onSearch }: SearchProps) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-10 p-4 w-full">
      <Input
        type="text"
        placeholder="Search for squirrels..."
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        className="flex-grow px-6 py-8 text-xl border-2 border-amber-200 
                   rounded-lg shadow-md 
                   bg-amber-50 text-amber-700
                   transition-all duration-300 transform 
                   hover:bg-white hover:text-amber-700 
                   focus:bg-white focus:text-amber-700
                   focus:ring-2 focus:ring-amber-600 
                   focus:border-amber-300
                   outline-none focus:scale-105
                   focus:shadow-[0_0_5px_3px_#d97706]"
      />
      <Button
        onClick={handleSearch}
        className="px-6 py-8 text-xl bg-gray-900 text-white rounded-lg hover:bg-gray-400 hover:text-gray-900 transition-all duration-300 ease-in-out"
      >
        Search
      </Button>
    </div>
  );
}
