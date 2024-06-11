import React from 'react';
import PropTypes from 'prop-types';
import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => (
  <div className={styles.gallery}>
    <ul className={styles.list}>
      {images.map(image => (
       <li className={styles.item} key={image.id}>
          <ImageCard  image={image} onClick={onImageClick} />
       </li>
    ))}
    </ul>
  </div>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
