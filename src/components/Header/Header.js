import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link to="/">Han Spoon</Link>
        <div>검색컴포넌트</div>
      </div>
      <div>로그인버튼</div>
    </header>
  );
}
