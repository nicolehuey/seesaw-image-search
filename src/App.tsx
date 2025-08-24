import React, { useState } from 'react';
import ImageCard from './components/ImageCard';
import ImageModal from './components/ImageModal';
import { FlickrPhoto } from './types/flickr';
import { useImageSearch } from './hooks/useImageSearch';

function App() {
  const {
    searchTerm,
    setSearchTerm,
    photos,
    loading,
    error,
    hasMore,
    totalPhotos,
    hasSearched,
    handleSearch,
  } = useImageSearch();

  const [selectedPhoto, setSelectedPhoto] = useState<FlickrPhoto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 order-1 sm:order-none">
              📸 Image Search
            </h1>
            <div className="flex-1 w-full sm:max-w-lg mx-0 sm:mx-8 order-3 sm:order-none">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for images..."
                    className="w-full px-4 py-2 pl-10 pr-10 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      aria-label="Clear search"
                    >
                      <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading || !searchTerm.trim()}
                  className="px-4 sm:px-6 py-2 bg-black text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2 text-sm sm:text-base whitespace-nowrap"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                      <span className="hidden sm:inline">Searching...</span>
                      <span className="sm:hidden">...</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span className="hidden sm:inline">Search</span>
                      <span className="sm:hidden">Go</span>
                    </>
                  )}
                </button>
              </form>
            </div>
            <div className="text-xs sm:text-sm text-gray-500 order-2 sm:order-none">
              Powered by Flickr
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {error && (
          <div className="text-center py-4 sm:py-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm sm:text-base">{error}</p>
            </div>
          </div>
        )}

        {!loading && photos.length === 0 && !error && !hasSearched &&  (
          <div className="text-center py-8 sm:py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Start searching for images</h3>
              <p className="text-sm sm:text-base text-gray-500">Enter a search term above to discover beautiful photos from Flickr</p>
            </div>
          </div>
        )}

        {!loading && photos.length === 0 && hasSearched && !error && (
          <div className="text-center py-8 sm:py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No images found</h3>
              <p className="text-sm sm:text-base text-gray-500">No photos were found for your search term. Try a different keyword.</p>
            </div>
          </div>
        )}

        {/* Pinterest-style Image Grid */}
        {photos.length > 0 && (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 sm:gap-4 space-y-2 sm:space-y-4">
            {photos.map((photo) => (
              <ImageCard
                key={photo.id}
                photo={photo}
                onClick={(photo) => {
                  setSelectedPhoto(photo);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>
        )}

        {/* Results Count */}
        {photos.length > 0 && (
          <div className="text-center mt-6 sm:mt-8">
            <p className="text-sm sm:text-base text-gray-600">
              Showing {photos.length} of {totalPhotos} images for "{searchTerm}"
            </p>
          </div>
        )}

        {/* Infinite Scroll Sentinel */}
        <div id="scroll-sentinel" className="h-8 sm:h-10 flex items-center justify-center">
          {loading && hasMore && (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-blue-600"></div>
              <span className="text-sm sm:text-base text-gray-600">Loading images...</span>
            </div>
          )}
          {!hasMore && photos.length > 0 && (
            <p className="text-sm sm:text-base text-gray-500">No more images to load</p>
          )}
        </div>
      </main>

      {/* Image Modal */}
      {selectedPhoto && isModalOpen && (
        <ImageModal
          photo={selectedPhoto}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPhoto(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
