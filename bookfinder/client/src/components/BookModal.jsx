import React, { useEffect, useRef } from 'react';

const BookModal = ({ book, summary, isLoading, error, onClose }) => {
  const modalRef = useRef();

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <div className="flex justify-end p-4">
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="px-6 pb-6 max-h-[calc(90vh-8rem)] overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
              <img 
                src={book.coverUrl} 
                alt={`${book.title} cover`} 
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
            
            <div className="flex-grow">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{book.title}</h2>
                <p className="text-gray-600">by {book.author}</p>
                <span className="inline-block mt-2 bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                  {book.genre}
                </span>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">AI-Generated Summary</h3>
                
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin-slow rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    <span className="ml-3 text-gray-600">Generating summary in {book.genre} style...</span>
                  </div>
                ) : error ? (
                  <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                    <p>{error}</p>
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
    </div>
  );
};

export default BookModal; 