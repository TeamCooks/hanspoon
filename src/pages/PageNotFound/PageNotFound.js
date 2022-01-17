import { Link } from 'react-router-dom';
import styles from './PageNotFound.module.scss';

export default function PageNotFound () {
  return <div className={styles.pageNotFound}>
    <h2 className={styles.heading}>Oops! Page Not Found!</h2>
    <Link to='/'>Go to main page?</Link>

  </div>
}