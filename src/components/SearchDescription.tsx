import React from 'react';
import { SearchDescriptionProps } from '../types/image';

const SearchDescription: React.FC<SearchDescriptionProps> = ({ resultTitle, resultDescription }) => {

  return (
    <div className="text-center py-8 sm:py-12">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">{resultTitle}</h3>
        <p className="text-sm sm:text-base text-gray-500">{resultDescription}</p>
      </div>
    </div>
  )
}

export default SearchDescription;