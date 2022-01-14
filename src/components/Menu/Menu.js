import styles from './Menu.module.scss';
import { Link } from 'react-router-dom';
import { BsPersonCircle } from 'react-icons/bs';

export function Menu() {
  return (
    <nav className={styles.nav}>
      <button
        className={[styles.button, styles.circle].join(' ')}
        aria-label="User Menu"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <BsPersonCircle />
      </button>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link to="/my-recipes" tabIndex="-1">
            My Recipes
          </Link>
        </li>
        <li className={styles.item}>
          <button className={styles.button} tabIndex="-1">
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
}
