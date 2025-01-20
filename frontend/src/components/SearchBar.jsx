import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const [matchAll, setMatchAll] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput, matchAll);
  };

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search skills (separate multiple skills with commas)"
            className="flex-1 p-3 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors whitespace-nowrap"
          >
            Search Skills
          </button>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={matchAll}
              onChange={(e) => setMatchAll(e.target.checked)}
              className="form-checkbox h-5 w-5 text-sky-600 rounded border-sky-300"
            />
            <span className="ml-2 text-sky-900">
              Match all skills (AND search)
            </span>
          </label>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
