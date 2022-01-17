import styles from './Menu.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IconButton, Button } from '../../components';

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.nav}>
      <IconButton
        type="button"
        variant="default"
        state="user"
        size="large"
        ariaLabel="User Menu"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={handleClick}
      />
      <ul className={`${styles.list} ${isOpen ? styles.active : ''}`}>
        <li className={styles.item}>
          <Link to="/my-recipes" tabIndex={isOpen ? 0 : -1}>
            My Recipes
          </Link>
        </li>
        <li className={styles.item}>
          <Button type="button" variant="text" tabIndex={isOpen ? 0 : -1}>
            Sign Out
          </Button>
        </li>
      </ul>
    </nav>
  );
}
