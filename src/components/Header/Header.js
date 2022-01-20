import styles from './Header.module.scss';
import { SearchForm, Menu, Button, Logo } from '../../components';

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
      <Logo />
      <SearchForm />
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
