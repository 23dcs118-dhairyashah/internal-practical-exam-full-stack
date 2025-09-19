import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";

const MovieRow = ({ title, movies, onMovieClick }) => {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="px-4 md:px-16 mb-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">{title}</h2>
      <div className="relative group">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div 
          ref={rowRef}
          className="flex space-x-2 overflow-x-scroll scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id} 
              movie={movie} 
              onClick={() => onMovieClick(movie)}
            />
          ))}
        </div>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;