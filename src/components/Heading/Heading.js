import classNames from 'classnames';
import styles from './Heading.module.scss';

export function Heading({ as: Component, className, children }) {
  return <Component className={classNames(styles.heading, className)}>{children}</Component>;
}
