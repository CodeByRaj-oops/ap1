import React, { useState } from 'react';

const BookCard = ({ book, onClick }) => {
  const [imageError, setImageError] = useState(false);
  
  // Generate a fallback image URL based on the book title and genre
  const getFallbackImage = () => {
    const encodedTitle = encodeURIComponent(book.title);
    const encodedGenre = encodeURIComponent(book.genre);
    return `https://source.unsplash.com/300x450/?book,${encodedGenre},${encodedTitle}`;
  };

  // Handle image loading error
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div 
      onClick={() => onClick(book)}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col transform hover:scale-[1.02]"
    >
      <div className="relative overflow-hidden" style={{ paddingBottom: '150%' }}>
        <img 
          src={imageError ? getFallbackImage() : book.coverUrl} 
          alt={`${book.title} cover`} 
          className="absolute top-0 left-0 w-full h-full object-cover"
          loading="lazy"
          onError={handleImageError}
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent opacity-70 h-16"></div>
        <span className="absolute bottom-2 right-2 inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
          {book.genre}
        </span>
      </div>
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
      </div>
    </div>
  );
};

export default BookCard; 