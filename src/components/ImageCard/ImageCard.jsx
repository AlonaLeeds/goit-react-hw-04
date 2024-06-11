import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageCard.module.css';

const ImageCard = ({ image, onClick }) => (
  <li className={styles.card} onClick={() => onClick(image)}>
    <img src={image.urls.small} alt={image.alt_description} className={styles.image} />
  </li>
);

ImageCard.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageCard;
