import styles from './SearchForm.module.scss';
import { FiSearch } from 'react-icons/fi';

export function SearchForm() {
  return (
    <form className={styles.form}>
      <label className="a11yHidden" for="searchRecipe">
        Search recipes
      </label>
      <input id="searchRecipe" type="search" className={styles.input} autoComplete="off" />
      <button className={styles.button} aria-label="search">
        <FiSearch />
      </button>
    </form>
  );
}
