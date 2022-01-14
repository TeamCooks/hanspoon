import styles from './Header.module.scss';
import { SearchForm } from '../../components';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link to="/">Han Spoon</Link>
        <SearchForm />
      </div>
      <div>로그인버튼</div>
    </header>
  );
}
