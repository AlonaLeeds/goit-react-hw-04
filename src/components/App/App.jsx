import React, { useState, useEffect, useCallback } from 'react';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import './App.module.css';

const API_KEY = 'q7OA9rdPgaQZW7RAlAorIK8uucjCdIdaRNDA6ZMcnx0';
const API_URL = 'https://api.unsplash.com/search/photos';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
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
      if (response.data.results.length === 0) {
        setNotFound(true);
      } else {
        setImages((prevImages) => (page === 1 ? response.data.results : [...prevImages, ...response.data.results]));
        setNotFound(false);
      }
    } catch (err) {
      setError(err.message);
      setNotFound(false); // Встановлюємо false, якщо є помилка
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
    setNotFound(false); // Скидаємо стан notFound при новому пошуку
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
      {notFound ? (
        <p className="not-found-message">No images found for "{query}"... 📷</p>
      ) : (
        <>
          <ImageGallery images={images} onImageClick={handleImageClick} />
          {loading && <Loader />}
          {images.length > 0 && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
        </>
      )}
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
