import PropTypes from 'prop-types';
import styles from './SkeletonCard.module.scss';
import classNames from 'classnames';

export function SkeletonCard({ type, background, hasSummary, headingPosition }) {
  return (
    <div className={classNames({ [styles.inlineBlock]: type === 'square' })}>
      <figure
        className={classNames(styles['cardWrap'], styles[background], { [styles.inlineBlock]: type === 'square' })}
      >
        <div className={classNames(styles[type], styles.skeletonImage)} />
        <figcaption className={classNames(styles['title'], styles[headingPosition])} />
        <span className={styles[hasSummary]} />
      </figure>
    </div>
  );
}

SkeletonCard.propTypes = {
  type: PropTypes.oneOf(['wide', 'square']),
  background: PropTypes.oneOf(['white', 'none']),
  hasSummary: PropTypes.bool,
  headingPosition: PropTypes.oneOf(['bottomLeft', 'bottomCenter', 'topLeft']),
};
