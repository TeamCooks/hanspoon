import styles from './Heading.module.scss';

export function Heading({ as: Component, children }) {
  return <Component className={styles.heading}>{children}</Component>;
}
