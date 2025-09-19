import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';
import Navbar from './components/Navbar';
import MovieRow from './components/MovieRow';
import TrailerModal from './components/TrailerModel';

const API_KEY = '730e32033b2e4f3dae253f890436ec81';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

const App = () => {
  const [movies, setMovies] = useState({ trending: [], popular: [], topRated: [], upcoming: [] });
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (movies.trending && movies.trending.length > 0) {
      setFeaturedMovie(movies.trending[0]);
    }

    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [movies]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [trendingRes, popularRes, topRatedRes, upcomingRes] = await Promise.all([
          fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`),
          fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`),
          fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`),
          fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`)
        ]);
        
        const trendingData = await trendingRes.json();
        const popularData = await popularRes.json();
        const topRatedData = await topRatedRes.json();
        const upcomingData = await upcomingRes.json();
        
        setMovies({
          trending: trendingData.results || [],
          popular: popularData.results || [],
          topRated: topRatedData.results || [],
          upcoming: upcomingData.results || []
        });
        
        if (trendingData.results && trendingData.results.length > 0) {
          setFeaturedMovie(trendingData.results[0]);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const openTrailerModal = (movie) => {
    setSelectedMovie(movie);
    setShowTrailerModal(true);
  };

  const closeTrailerModal = () => {
    setShowTrailerModal(false);
    setSelectedMovie(null);
  };

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
          <p className="mt-4 text-xl">Loading CharusatFlix...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <Navbar isNavScrolled={isNavScrolled} />

      {/* Banner */}
      {featuredMovie && (
        <div 
          className="relative h-screen bg-cover bg-center flex items-center"
          style={{
            backgroundImage: `url(${BACKDROP_BASE_URL}${featuredMovie.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
          <div className="relative z-10 px-4 md:px-16 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              {featuredMovie.title || featuredMovie.name}
            </h1>
            <p className="text-lg md:text-xl mb-8 drop-shadow-md line-clamp-3">
              {featuredMovie.overview}
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => openTrailerModal(featuredMovie)}
                className="bg-white text-black px-8 py-3 rounded flex items-center space-x-2 font-semibold hover:bg-gray-200 transition-colors"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Play</span>
              </button>
              <button className="bg-gray-500/70 text-white px-8 py-3 rounded flex items-center space-x-2 font-semibold hover:bg-gray-500/90 transition-colors">
                <Info className="w-5 h-5" />
                <span>More Info</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Movie Rows */}
      <div className="relative z-10 -mt-32">
        <MovieRow
          title="Trending Now" 
          movies={movies.trending} 
          onMovieClick={openTrailerModal}
        />
        <MovieRow 
          title="Popular on CharusatFlix" 
          movies={movies.popular} 
          onMovieClick={openTrailerModal}
        />
        <MovieRow 
          title="Top Rated" 
          movies={movies.topRated} 
          onMovieClick={openTrailerModal}
        />
        <MovieRow 
          title="Coming Soon" 
          movies={movies.upcoming} 
          onMovieClick={openTrailerModal}
        />
      </div>
      {showTrailerModal && (
        <TrailerModal
          movie={selectedMovie} 
          onClose={closeTrailerModal} 
        />
      )}
    </div>
  );
};

export default App;