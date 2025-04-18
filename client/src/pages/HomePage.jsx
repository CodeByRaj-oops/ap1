import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import BookModal from '../components/BookModal';
import bookApi from '../api/bookApi';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedBook, setSelectedBook] = useState(null);
  const [summary, setSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState(null);

  // Fetch all books on initial load
  useEffect(() => {
    fetchBooks();
  }, []);

  // Function to fetch books (all or filtered)
  const fetchBooks = async (term = '') => {
    try {
      setLoading(true);
      setError(null);
      setSearchTerm(term);
      
      const data = term 
        ? await bookApi.searchBooks(term)
        : await bookApi.getAllBooks();
      
      setBooks(data);
    } catch (err) {
      console.error('Error fetching books:', err);
      // Show more specific error message
      setError(
        err.response?.data?.error || 
        err.message || 
        'Failed to fetch books. Please check server connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (term) => {
    fetchBooks(term);
  };

  // Handle book click
  const handleBookClick = (book) => {
    setSelectedBook(book);
    generateSummary(book.title, book.author, book.genre);
  };

  // Generate summary for selected book
  const generateSummary = async (title, author, genre) => {
    try {
      setSummaryLoading(true);
      setSummaryError(null);
      setSummary('');
      
      const data = await bookApi.generateBookSummary(title, author, genre);
      setSummary(data.summary);
    } catch (err) {
      console.error('Error generating summary:', err);
      
      // Enhanced error handling - extract detailed error information if available
      let errorMessage = 'An error occurred while generating the summary.';
      
      if (err.response && err.response.data) {
        // Use specific error message from API if available
        if (err.response.data.error) {
          errorMessage = err.response.data.error;
          
          // Add details if available
          if (err.response.data.details) {
            errorMessage += `: ${err.response.data.details}`;
          }
        }
      } else if (err.message) {
        // If it's a network error or other issue
        if (err.message.includes('Network Error')) {
          errorMessage = 'Cannot connect to the server. Please check if the server is running.';
        } else {
          errorMessage = `Error: ${err.message}`;
        }
      }
      
      setSummaryError(errorMessage);
    } finally {
      setSummaryLoading(false);
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setSelectedBook(null);
    setSummary('');
  };

  // Retry generating the summary
  const handleRetrySummary = () => {
    if (selectedBook) {
      generateSummary(selectedBook.title, selectedBook.author, selectedBook.genre);
    }
  };

  // Group books by genre for a nicer display
  const groupedBooks = books.reduce((acc, book) => {
    const genre = book.genre.toLowerCase();
    if (!acc[genre]) {
      acc[genre] = [];
    }
    acc[genre].push(book);
    return acc;
  }, {});

  return (
    <div>
      {/* Page title and description */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">AI-Powered Book Recommendations</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Search for books by genre and get AI-generated summaries in the style of each genre. 
          Try searching for "horror", "comedy", "science fiction", or "self development".
        </p>
      </div>
      
      {/* Search bar */}
      <SearchBar onSearch={handleSearch} />
      
      {/* Book grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin-slow rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          <span className="ml-3 text-gray-600">Loading books...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-6 rounded-lg text-center my-8">
          <h3 className="text-xl font-bold mb-2">Connection Error</h3>
          <p className="font-medium mb-4">{error}</p>
          <div className="text-sm text-left bg-red-100 p-4 rounded mb-4 max-w-xl mx-auto">
            <p className="font-semibold mb-2">Troubleshooting steps:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Make sure the server is running (check console)</li>
              <li>Verify the server is running on port 5000</li>
              <li>Check if a valid OpenAI API key is set in server/.env</li>
              <li>Try running the fix-network.bat file</li>
            </ol>
          </div>
          <button 
            onClick={() => fetchBooks()} 
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : books.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No books found matching your search. Try a different genre.</p>
        </div>
      ) : searchTerm ? (
        // Display search results in a simple grid
        <div>
          <h2 className="text-xl font-semibold my-4">
            Search results for "{searchTerm}"
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {books.map((book) => (
              <BookCard 
                key={book.id} 
                book={book} 
                onClick={handleBookClick} 
              />
            ))}
          </div>
        </div>
      ) : (
        // Display books grouped by genre
        <div className="space-y-10">
          {Object.entries(groupedBooks).map(([genre, genreBooks]) => (
            <div key={genre}>
              <h2 className="text-xl font-semibold my-4 capitalize">
                {genre}
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({genreBooks.length} books)
                </span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {genreBooks.map((book) => (
                  <BookCard 
                    key={book.id} 
                    book={book} 
                    onClick={handleBookClick} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Book summary modal */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          summary={summary}
          isLoading={summaryLoading}
          error={summaryError}
          onClose={handleCloseModal}
          onRetry={handleRetrySummary}
        />
      )}
    </div>
  );
};

export default HomePage; 