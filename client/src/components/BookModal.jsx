import React, { useEffect, useRef, useState } from 'react';

const BookModal = ({ book, summary, isLoading, error, onClose, onRetry }) => {
  const modalRef = useRef();
  const [imageError, setImageError] = useState(false);
  
  // Generate a higher quality fallback image
  const getFallbackImage = () => {
    const encodedTitle = encodeURIComponent(book.title);
    const encodedAuthor = encodeURIComponent(book.author);
    const encodedGenre = encodeURIComponent(book.genre);
    return `https://source.unsplash.com/600x900/?book,${encodedGenre},${encodedTitle},${encodedAuthor}`;
  };

  // Handle image loading error
  const handleImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto'; // Re-enable scrolling when modal is closed
    };
  }, [onClose]);

  // Get a larger version of the book cover by modifying the Google Books URL if possible
  const getEnhancedCoverUrl = () => {
    if (book.coverUrl && book.coverUrl.includes('books.google.com')) {
      // Replace zoom parameter for larger image
      return book.coverUrl.replace('zoom=1', 'zoom=3').replace('&edge=curl', '');
    }
    return book.coverUrl;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 fade-in">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="flex justify-end p-4 border-b">
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
              <div className="relative">
                <img 
                  src={imageError ? getFallbackImage() : getEnhancedCoverUrl()} 
                  alt={`${book.title} cover`} 
                  className="w-full h-auto rounded-lg shadow-md"
                  onError={handleImageError}
                />
                <div className="absolute top-0 right-0 m-2">
                  <span className="inline-block bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full">
                    {book.genre}
                  </span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <h2 className="text-xl font-bold text-gray-900">{book.title}</h2>
                <p className="text-gray-600">by {book.author}</p>
              </div>
            </div>
            
            <div className="flex-grow">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                AI-Generated Summary
                <span className="text-sm font-normal text-gray-500 block mt-1">
                  Generated in the style of {book.genre}
                </span>
              </h3>
              
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin-slow rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                  <span className="ml-3 text-gray-600">Generating your summary...</span>
                </div>
              ) : error ? (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                  <p className="font-bold text-lg">Error generating summary</p>
                  <p className="mt-1">{error}</p>
                  
                  {/* Display the error troubleshooting guide */}
                  <div className="mt-4 text-sm bg-red-100 p-3 rounded">
                    <p className="font-semibold mb-2">Troubleshooting:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Check if the OpenAI API key is correctly configured in server/.env</li>
                      <li>Verify the server is running (check console)</li>
                      <li>Ensure you have an active internet connection</li>
                      <li>The API key may have usage limits or be invalid</li>
                    </ul>
                  </div>
                  
                  <button 
                    onClick={() => onRetry && onRetry()}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">{summary}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal; 