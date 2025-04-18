import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <Link to={`/book/${book.id}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative pb-[150%]">
          <img 
            src={book.coverUrl} 
            alt={`${book.title} cover`} 
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{book.title}</h3>
          <p className="text-sm text-gray-600">{book.author}</p>
          <div className="mt-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {book.genre}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard; 