import styles from './Menu.module.scss';
import { Link } from 'react-router-dom';
import { BsPersonCircle } from 'react-icons/bs';
import { useState } from 'react';

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.nav}>
      <button
        className={[styles.button, styles.circle].join(' ')}
        aria-label="User Menu"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={handleClick}
      >
        <BsPersonCircle />
      </button>
      <ul className={`${styles.list} ${isOpen ? styles.active : ''}`}>
        <li className={styles.item}>
          <Link to="/my-recipes" tabIndex={isOpen ? 0 : -1}>
            My Recipes
          </Link>
        </li>
        <li className={styles.item}>
          <button className={styles.button} tabIndex={isOpen ? 0 : -1}>
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
}
