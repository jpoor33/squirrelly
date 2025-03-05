import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface SearchProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchProps) {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchedSearchHistory = async () => {
      try {
        const token = localStorage.getItem("loginToken");
        const response = await fetch("/api/search/history", {
          headers: { Authorization: `bear ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setHistory(data);
        }
      } catch (error) {
        console.log("Error fetching search history", error);
      }
    };

    fetchedSearchHistory();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setOpen(value.trim() !== "");
    if (value.trim() === "") {
      onSearch("");
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      onSearch("");
      return;
    }
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bear " + (localStorage.getItem("loginToken") || ""),
        },
        body: JSON.stringify({ q: query.trim() }),
      });
      if (!response.ok) return;
      const data = await response.json();
      onSearch(data);

      await fetch("/api/search/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bear " + (localStorage.getItem("loginToken") || ""),
        },
        body: JSON.stringify({ query: query.trim() }),
      });
    } catch (error) {
      console.error("You need to login to search!", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSelectHistory = (item: string) => {
    setQuery(item);
    setOpen(false);
    handleSearch();
  };

  return (
    <div className="flex gap-10 p-4 w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Input
            type="text"
            placeholder="Search for squirrels..."
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className="flex-grow px-6 py-8 text-xl border-2 border-gray-300 rounded-lg shadow-md 
                       bg-transparent text-white transition-all duration-300 transform 
                       hover:bg-white hover:text-black 
                       focus:bg-white focus:text-black focus:ring-2 focus:ring-blue-400 focus:border-blue-500 
                       outline-none focus:scale-105"
          />
        </PopoverTrigger>
        {history.length > 0 && (
          <PopoverContent align="start" className="w-full bg-white border rounded-md shadow-m">
            {history.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSelectHistory(item)}
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200"
              >
                {item}
              </button>
            ))}
          </PopoverContent>
        )}
      </Popover>

      <Button
        onClick={handleSearch}
        className="px-6 py-8 text-xl bg-gray-900 text-white rounded-lg hover:bg-gray-400 hover:text-gray-900 transition-all duration-300 ease-in-out"
      >
        Search
      </Button>
    </div>
  );
}
