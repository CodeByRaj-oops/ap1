import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import BookModal from '../components/BookModal';
import { getAllBooks, searchBooks, generateBookSummary } from '../services/api';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [summary, setSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState(null);

  useEffect(() => {
    // Fetch all books on initial load
    fetchBooks();
  }, []);

  const fetchBooks = async (searchTerm = '') => {
    try {
      setLoading(true);
      setError(null);
      
      const data = searchTerm 
        ? await searchBooks(searchTerm)
        : await getAllBooks();
      
      setBooks(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
      setLoading(false);
      console.error('Error fetching books:', err);
    }
  };

  const handleSearch = (searchTerm) => {
    fetchBooks(searchTerm);
  };

  const handleBookClick = async (book) => {
    setSelectedBook(book);
    fetchSummary(book.title, book.genre);
  };

  const fetchSummary = async (title, genre) => {
    try {
      setSummaryLoading(true);
      setSummaryError(null);
      setSummary('');
      
      const data = await generateBookSummary(title, genre);
      setSummary(data.summary);
      setSummaryLoading(false);
    } catch (err) {
      setSummaryError('Failed to generate summary. Please try again.');
      setSummaryLoading(false);
      console.error('Error generating summary:', err);
    }
  };

  const closeModal = () => {
    setSelectedBook(null);
    setSummary('');
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">Find Your Next Great Read</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          Search for books by genre, title, or author. Click on a book to see an AI-generated summary in the style of the book's genre.
        </p>
      </div>

      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin-slow rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
          <p>{error}</p>
        </div>
      ) : books.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-gray-600">No books found. Try a different search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {books.map((book) => (
            <div key={book.id} onClick={() => handleBookClick(book)}>
              <BookCard book={book} />
            </div>
          ))}
        </div>
      )}

      {selectedBook && (
        <BookModal
          book={selectedBook}
          summary={summary}
          isLoading={summaryLoading}
          error={summaryError}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default HomePage; 