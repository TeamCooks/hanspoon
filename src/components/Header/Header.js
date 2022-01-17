import styles from './Header.module.scss';
import { SearchForm } from '../../components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Auth } from '../Auth/Auth';

export function Header() {
  const [isVisible, setIsVisible] = useState(false);

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
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label="Open SignIn Dialog"
        title="Open SignIn Dialog"
        onClick={handleOpenDialog}
      >
        로그인버튼
      </button>
      <Auth isVisible={isVisible} onClose={handleCloseDialog} />
    </header>
  );
}
