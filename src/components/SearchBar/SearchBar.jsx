import React, { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Please enter a search query');
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={styles.searchBar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Search</button>
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
