import React, { useState } from 'react';
import { ImageCardProps } from '../types/image';
import { FlickrPhoto } from '../types/flickr';

const ImageCard: React.FC<ImageCardProps> = ({ photo, onClick }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  const getImageUrl = (photo: FlickrPhoto) => {
    return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`;
  };

  const getDownloadUrl = (photo: FlickrPhoto) => {
    return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
    console.warn(`Failed to load image: ${photo.id}`);
  };

  const handleCardClick = () => {
    if (!imageLoading && !imageError) {
      onClick(photo);
    }
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent modal from opening
    
    try {
      const downloadUrl = getDownloadUrl(photo);
      
      // Fetch the image as a blob
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      
      // Create a blob URL
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create download link
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${photo.title || 'flickr-image'}-${photo.id}.jpg`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
      // Fallback to direct link if blob download fails
      const downloadUrl = getDownloadUrl(photo);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${photo.title || 'flickr-image'}-${photo.id}.jpg`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Initialize image URL
  React.useEffect(() => {
    setCurrentImageUrl(getImageUrl(photo));
    setImageLoading(true);
    setImageError(false);
  }, [photo]);

  return (
    <div 
      className="group relative bg-white cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div className="relative">
        {/* Save button - positioned at top right */}
        <button
          onClick={handleDownload}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm hover:shadow-md"
          title="Save image"
          aria-label="Save image"
        >
          Save
        </button>

        {/* Skeleton loading state */}
        {imageLoading && (
          <div className="w-full h-64 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
        
        {/* Error state */}
        {imageError && (
          <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
              </svg>
              <p className="text-xs text-gray-500">Failed to load</p>
            </div>
          </div>
        )}
        
        {/* Single image with progressive loading */}
        {currentImageUrl && !imageError && (
          <img
            src={currentImageUrl}
            alt={photo.title || 'Flickr photo'}
            className={`w-full h-auto object-cover transition-opacity duration-500 ${
              imageLoading ? 'opacity-0 absolute inset-0' : 'opacity-100'
            }`}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
        
        {/* Hover overlay with view indicator */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 rounded-full p-3">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Image info */}
      {photo.title && (
        <div className="p-3">
          <p className="text-sm text-gray-700 line-clamp-2">{photo.title}</p>
          <p className="text-xs text-gray-500 mt-1">by {photo.owner}</p>
        </div>
      )}
    </div>
  );
};

export default ImageCard; 