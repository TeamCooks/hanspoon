import styles from './Menu.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IconButton, Button } from '../../components';
import { useSignOut } from '../../contexts/AuthContext';

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const signOut = useSignOut();
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={styles.nav} onBlur={handleBlur}>
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
      {isOpen && (
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/my-recipes">My Recipes</Link>
          </li>
          <li className={styles.item}>
            <Button type="button" variant="text" onClick={signOut}>
              Sign Out
            </Button>
          </li>
        </ul>
      )}
    </nav>
  );
}
