import styles from './Header.module.scss';
import { SearchForm, Menu } from '../../components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Auth } from '../Auth/Auth';

export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);

  const handleClick = () => {
    setIsSignIn(!isSignIn);
  };

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
      {isSignIn ? (
        <Menu />
      ) : (
        <button
          type="button"
          aria-haspopup="dialog"
          aria-label="Open SignIn Dialog"
          title="Open SignIn Dialog"
          onClick={handleOpenDialog}
        >
          로그인
        </button>
      )}
      <Auth isVisible={isVisible} onClose={handleCloseDialog} />
    </header>
  );
}
