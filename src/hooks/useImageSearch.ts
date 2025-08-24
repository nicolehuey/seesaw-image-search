import { useState, useEffect } from 'react';
import { FlickrPhoto, FlickrResponse } from '../types/flickr';

export const useImageSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [photos, setPhotos] = useState<FlickrPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  // Load more photos when scrolling to bottom
  const loadMorePhotos = () => {
    if (!loading && hasMore && searchTerm && hasSearched) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      searchPhotos(searchTerm, nextPage, true);
    }
  };

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMorePhotos();
        }
      },
      { threshold: 0.1 }
    );

    const sentinel = document.getElementById('scroll-sentinel');
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [hasMore, loading, hasSearched, currentPage]);

  const searchPhotos = async (query: string, page: number = 1, append: boolean = false) => {
    // avoid calling api if query is empty
    if (!query.trim()) return;

    setLoading(true);
    setError('');

    try {
      const apiKey = process.env.REACT_APP_FLICKR_API_KEY;

      if (!apiKey) {
        throw new Error('API key not found. Please check your .env file.');
      }

      const apiPath = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${encodeURIComponent(query)}&format=json&nojsoncallback=1&per_page=30&sort=relevance&page=${page}`

      console.log('API URL:', apiPath);
      const response = await fetch(apiPath);

      if (!response.ok) {
        throw new Error('Failed to fetch photos');
      }
      const data: FlickrResponse = await response.json();

      if (data.stat === 'ok') {
        const newPhotos = data.photos.photo;

        setTotalPhotos(parseInt(data.photos.total));

        if (append) {
          // Append new photos to existing ones
          setPhotos(prev => [...prev, ...newPhotos]);
        } else {
          // Replace photos for new search
          setPhotos(newPhotos);
          setCurrentPage(1);
        }

        // Check if we have more photos to load
        const totalLoaded = append ? photos.length + newPhotos.length : newPhotos.length;
        setHasMore(totalLoaded < parseInt(data.photos.total));

      } else {
        setError('Failed to load photos');
      }
    } catch (err) {
      setError('Error fetching photos. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPhotos([]);
    setCurrentPage(1);
    setHasMore(true);
    setHasSearched(true);
    searchPhotos(searchTerm, 1, false);
  };

  return {
    searchTerm,
    setSearchTerm,
    photos,
    loading,
    error,
    hasMore,
    totalPhotos,
    hasSearched,
    handleSearch,
  };
}; 