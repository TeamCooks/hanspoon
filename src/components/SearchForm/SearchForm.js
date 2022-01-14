import styles from './SearchForm.module.scss';
import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';

export function SearchForm() {
  const [keyword, setKeyword] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setKeyword('');
  }, [location]);

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setKeyword('');
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      alert('Please enter the search word.');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className="a11yHidden" htmlFor="searchRecipe">
        Search recipes
      </label>
      <input
        id="searchRecipe"
        type="search"
        className={styles.input}
        autoComplete="off"
        value={keyword}
        onChange={handleChange}
      />
      <button className={styles.button} aria-label="search">
        <FiSearch />
      </button>
    </form>
  );
}
