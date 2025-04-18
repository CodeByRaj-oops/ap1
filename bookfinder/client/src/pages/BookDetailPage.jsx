import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookById, generateBookSummary } from '../services/api';

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summaryError, setSummaryError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const data = await getBookById(parseInt(id));
        setBook(data);
        setLoading(false);
        // Auto-fetch summary once book is loaded
        fetchSummary(data.title, data.genre);
      } catch (err) {
        setError('Failed to fetch book details. Please try again later.');
        setLoading(false);
        console.error('Error fetching book:', err);
      }
    };

    fetchBook();
  }, [id]);

  const fetchSummary = async (title, genre) => {
    try {
      setSummaryLoading(true);
      setSummaryError(null);
      const data = await generateBookSummary(title, genre);
      setSummary(data.summary);
      setSummaryLoading(false);
    } catch (err) {
      setSummaryError('Failed to generate summary. Please try again.');
      setSummaryLoading(false);
      console.error('Error fetching summary:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin-slow rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
        <p>{error}</p>
        <Link to="/" className="text-indigo-500 mt-4 inline-block">
          &larr; Back to Books
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <Link to="/" className="text-indigo-500 hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Books
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-48">
            <img 
              className="h-full w-full object-cover md:h-full" 
              src={book.coverUrl} 
              alt={`${book.title} cover`} 
            />
          </div>
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {book.genre}
            </div>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
              {book.title}
            </h1>
            <p className="mt-2 text-gray-600">by {book.author}</p>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">AI-Generated Summary</h2>
              {summaryLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin-slow h-5 w-5 border-t-2 border-b-2 border-indigo-500 rounded-full"></div>
                  <p className="text-gray-600">Generating summary in {book.genre} style...</p>
                </div>
              ) : summaryError ? (
                <div>
                  <p className="text-red-500">{summaryError}</p>
                  <button 
                    onClick={() => fetchSummary(book.title, book.genre)}
                    className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
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

export default BookDetailPage; 