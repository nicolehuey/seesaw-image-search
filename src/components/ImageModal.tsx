import React from 'react';
import { FlickrPhoto } from '../types/flickr';
import { ImageModalProps } from '../types/image';

const ImageModal: React.FC<ImageModalProps> = ({ photo, isOpen, onClose }) => {
  if (!isOpen || !photo) return null;

  const getLargeImageUrl = (photo: FlickrPhoto) => {
    return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleDownload = async () => {
    try {
      const downloadUrl = getLargeImageUrl(photo);
      
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
      const downloadUrl = getLargeImageUrl(photo);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${photo.title || 'flickr-image'}-${photo.id}.jpg`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-2 sm:p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative max-w-4xl max-h-full bg-white rounded-lg shadow-2xl overflow-hidden w-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-1.5 sm:p-2 hover:bg-opacity-75 transition-colors duration-200"
          aria-label="Close modal"
        >
          <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative">
          <img
            src={getLargeImageUrl(photo)}
            alt={photo.title || 'Flickr photo'}
            className="w-full h-auto max-h-[70vh] sm:max-h-[80vh] object-contain"
            loading="eager"
          />
        </div>

        {/* Image info */}
        {(photo.title || photo.owner) && (
          <div className="p-4 sm:p-6 bg-white border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex-1">
                {photo.title && (
                  <h3 id="modal-title" className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{photo.title}</h3>
                )}
                {photo.owner && (
                  <p className="text-sm text-gray-600">by {photo.owner}</p>
                )}
                <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                  <span>Photo ID: {photo.id}</span>
                </div>
              </div>
              {/* Save button */}
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto bg-black hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
                aria-label="Save image"
                title="Save full-size image"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal; 