import styles from './Header.module.scss';
import { SearchForm, Menu } from '../../components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function Header() {
  const [isSignIn, setIsSignIn] = useState(false);

  const handleClick = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link to="/">Han Spoon</Link>
        <SearchForm />
      </div>
      {isSignIn ? <Menu /> : <button onClick={handleClick}>로그인</button>}
    </header>
  );
}
