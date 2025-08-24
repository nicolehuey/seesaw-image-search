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
      searchPhotos(nextPage, true);
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
    // eslint-disable-next-line
  }, [hasMore, loading, hasSearched, currentPage]);

  const searchPhotos = async (page: number = 1, append: boolean = false) => {
    // avoid calling api if query is empty
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError('');

    try {
      const apiKey = process.env.REACT_APP_FLICKR_API_KEY;

      if (!apiKey) {
        setError('API key not found. Please check your .env file.');
        setHasMore(false); // stop infinite scroll retries
        return;
      }

      const apiPath = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${encodeURIComponent(searchTerm)}&format=json&nojsoncallback=1&per_page=30&sort=relevance&page=${page}`

      const response = await fetch(apiPath);
      // check api response code
      if (!response.ok) {
        setError('Failed to fetch photos. Please check the API key and network connection.');
        setHasMore(false); // stop infinite retries
        return;
      }
      const data: FlickrResponse = await response.json();

      // check response stat value
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
        setError('Failed to load photos. Please check the API key and network connection.');
        setHasMore(false);
      }
    } catch (err) {
      setError('Error fetching photos. Please try again.');
      console.error('Error:', err);
      setHasMore(false);
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
    searchPhotos();
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