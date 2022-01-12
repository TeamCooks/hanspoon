import styles from './SearchForm.module.scss';

export function SearchForm() {
  return (
    <form className={styles.searchForm}>
      <input className={styles.searchInput} />
      <button className={styles.searchButton} />
    </form>
  );
}
