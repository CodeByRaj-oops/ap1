import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <Link 
      to={`/book/${book.id}`} 
      className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full"
    >
      <div className="aspect-[2/3] relative">
        <img 
          src={book.coverUrl} 
          alt={`${book.title} cover`} 
          className="absolute w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 truncate">{book.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{book.author}</p>
        <div className="mt-2">
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
            {book.genre}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BookCard; 