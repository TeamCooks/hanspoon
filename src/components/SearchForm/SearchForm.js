import styles from './SearchForm.module.scss';
import { FiSearch } from 'react-icons/fi';

export function SearchForm() {
  return (
    <form className={styles.searchForm}>
      <label className="a11yHidden" for="searchRecipe">
        Search recipes
      </label>
      <input id="searchRecipe" type="search" className={styles.searchInput} autoComplete="off" />
      <button className={styles.searchButton} aria-label="search">
        <FiSearch />
      </button>
    </form>
  );
}
