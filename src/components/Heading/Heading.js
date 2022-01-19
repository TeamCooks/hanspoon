import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Heading.module.scss';

export function Heading({ as: Component, className, children }) {
  return <Component className={classNames(styles.heading, className)}>{children}</Component>;
}

Heading.propTypes = {
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']).isRequired,
  className: PropTypes.string,
  children: PropTypes.any.isRequired
}