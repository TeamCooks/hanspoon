import styles from './Logo.module.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoIcon } from './../../assets/icons/logoIcon.svg';

export function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      <LogoIcon />
      <h1>HanSpoon</h1>
    </Link>
  );
}
