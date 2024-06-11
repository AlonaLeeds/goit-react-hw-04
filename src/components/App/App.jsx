import React, { useState, useEffect, useCallback } from 'react';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import './App.module.css';

const API_KEY = 'q7OA9rdPgaQZW7RAlAorIK8uucjCdIdaRNDA6ZMcnx0';
const API_URL = 'https://api.unsplash.com/search/photos';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  const fetchImages = useCallback(async () => {
    if (!query) return;

    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          query,
          page,
          per_page: 12,
          client_id: API_KEY,
        },
      });
      setImages((prevImages) => (page === 1 ? response.data.results : [...prevImages, ...response.data.results]));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleSearch = (newQuery) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image) => {
    setModalImage(image);
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  return (
    <div className="App">
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {images.length > 0 && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
      {modalImage && (
        <ImageModal
          isOpen={Boolean(modalImage)}
          onRequestClose={handleCloseModal}
          image={modalImage}
        />
      )}
      <Toaster />
    </div>
  );
};

export default App;
