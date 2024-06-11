import React from 'react';
import PropTypes from 'prop-types';
import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => (
  <ul className={styles.gallery}>
    {images.map((image) => (
      <ImageCard key={image.id} image={image} onClick={onImageClick} />
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
