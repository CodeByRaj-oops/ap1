import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by genre, title, or author (e.g., horror, sci-fi, self development)"
          className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded-r-lg hover:bg-indigo-700 transition-colors"
        >
          Search
        </button>
      </form>
      <p className="text-sm text-gray-500 mt-2">
        Try searching for genres like: horror, comedy, science fiction, fantasy, self development
      </p>
    </div>
  );
};

export default SearchBar; 