import React from 'react';
import { X, Play } from 'lucide-react';

const TrailerModal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 p-2 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Video placeholder - in a real app, you'd fetch trailer data from TMDB */}
          <div className="aspect-video bg-black flex items-center justify-center">
            <div className="text-center">
              <Play className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-400">Trailer for "{movie.title || movie.name}"</p>
              <p className="text-sm text-gray-500 mt-2">
                In a real app, this would show the actual trailer video from YouTube
              </p>
            </div>
          </div>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{movie.title || movie.name}</h2>
            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            
            <div className="flex space-x-4 mt-6">
              <button className="bg-white text-black px-6 py-2 rounded flex items-center space-x-2 font-semibold hover:bg-gray-200 transition-colors">
                <Play className="w-4 h-4 fill-current" />
                <span>Play</span>
              </button>
              <button className="border border-gray-500 text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors">
                + My List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;