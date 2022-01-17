import PropTypes from 'prop-types';
import styles from './Card.module.scss';
import classNames from 'classnames';
import { excludeTags } from '@utils/misc';

export function Card({
  id = 0,
  type,
  background,
  hasSummary,
  headingPosition,
  headingSize,
  padding,
  imgSrc = 'http://placehold.it/312x230',
  title,
  summary = '',
}) {
  function handleClick(e) {
    e.preventDefault();
  }
  return (
    <a role="button" onClick={handleClick}>
      <div className={classNames({ [styles.inlineBlock]: type === 'square' })}>
        <figure
          className={classNames(styles['cardWrap'], styles[background], { [styles.inlineBlock]: type === 'square' })}
        >
          <img className={styles[type]} src={imgSrc} alt={title + 'picture'} />
          <figcaption className={classNames(styles['title'], styles[headingPosition])}>{title}</figcaption>
          <span className={styles[hasSummary]}>{excludeTags(summary)}</span>
        </figure>
      </div>
    </a>
  );
}

Card.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf(['wide', 'square']),
  background: PropTypes.oneOf(['white', 'none']),
  hasSummary: PropTypes.bool,
  headingPosition: PropTypes.oneOf(['bottomLeft', 'bottomCenter', 'topLeft']),
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  summary: PropTypes.string,
};
