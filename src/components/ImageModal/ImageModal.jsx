import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import styles from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onRequestClose, image }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className={styles.modal}
    overlayClassName={styles.overlay}
  >
    {image && (
      <>
        <img src={image.urls.regular} alt={image.alt_description} className={styles.image} />
        <p>{image.description || 'No description'}</p>
        <p>{image.user.name}</p>
      </>
    )}
  </Modal>
);

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  image: PropTypes.object,
};

export default ImageModal;
