import React from 'react';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div 
      className="min-w-[200px] md:min-w-[300px] cursor-pointer transform transition-transform hover:scale-105"
      onClick={onClick}
    >
      <img 
        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.title || movie.name}
        className="w-full h-[300px] md:h-[450px] object-cover rounded-lg"
        onError={(e) => {
          e.target.src = `https://placehold.co/300x450/png?text=No+Image`;
        }}
      />
      <div className="mt-2">
        <h3 className="font-semibold truncate">{movie.title || movie.name}</h3>
      </div>
    </div>
  );
};

export default MovieCard;