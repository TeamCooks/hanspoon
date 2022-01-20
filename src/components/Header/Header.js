import styles from './Header.module.scss';
import { SearchForm, Menu, Button } from '../../components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Auth } from '../Auth/Auth';
import { useAuthUser } from '../../contexts/AuthContext';

export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const authUser = useAuthUser();

  const handleOpenDialog = () => {
    setIsVisible(true);
  };

  const handleCloseDialog = () => {
    setIsVisible(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link to="/">Han Spoon</Link>
        <SearchForm />
      </div>
      {authUser !== null ? (
        <Menu />
      ) : (
        <>
          <Button
            type="button"
            variant="text"
            aria-haspopup="dialog"
            aria-label="Open SignIn Dialog"
            title="Open SignIn Dialog"
            onClick={handleOpenDialog}
          >
            Sign In
          </Button>
          <Auth isVisible={isVisible} onClose={handleCloseDialog} />
        </>
      )}
    </header>
  );
}
