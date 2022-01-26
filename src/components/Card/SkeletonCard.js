import PropTypes from 'prop-types';
import styles from './SkeletonCard.module.scss';
import classNames from 'classnames';

export function SkeletonCard({ type, background, hasSummary, headingPosition }) {
  return (
    <div className={classNames({ [styles.inlineBlock]: type === 'square' })}>
      <div className={classNames(styles['cardWrap'], styles[background], { [styles.inlineBlock]: type === 'square' })}>
        <div className={classNames(styles[type], styles.skeletonImage)} />
        <div className={classNames(styles['title'], styles[headingPosition])} />
        <span className={styles[hasSummary]} />
      </div>
    </div>
  );
}

SkeletonCard.propTypes = {
  type: PropTypes.oneOf(['wide', 'square']),
  background: PropTypes.oneOf(['white', 'none']),
  hasSummary: PropTypes.bool,
  headingPosition: PropTypes.oneOf(['bottomLeft', 'bottomCenter', 'topLeft']),
};
