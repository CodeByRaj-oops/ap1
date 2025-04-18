import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="flex w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by genre (e.g., horror, romance, sci-fi, self development)"
          className="flex-grow px-5 py-3 text-base rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          aria-label="Search by genre, title, or author"
        />
        <button
          type="submit"
          className="bg-primary-600 text-white px-6 py-3 rounded-r-lg hover:bg-primary-700 transition-colors"
        >
          Search
        </button>
      </form>
      <p className="text-sm text-gray-500 mt-2 px-1">
        Try searching for: horror, comedy, science fiction, romance, self development, finance
      </p>
    </div>
  );
};

export default SearchBar; 