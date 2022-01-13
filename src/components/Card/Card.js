import PropTypes from 'prop-types';
import styles from './Card.module.scss';
import classNames from 'classnames';

export function Card({
  type,
  background,
  summary,
  headingPosition,
  imgSrc = 'http://placehold.it/312x230',
  foodName,
  summaryText = '',
}) {
  return (
    <div className={type === 'square' ? styles['inlineBlock'] : ''}>
      <figure className={classNames(styles['cardWrap'], styles[background], type === 'square' ? 'inlineBlock' : '')}>
        {headingPosition === 'topLeft' ? (
          <figcaption className={classNames(styles['title'], styles[headingPosition])}>{foodName}</figcaption>
        ) : (
          ''
        )}
        <img className={styles[type]} src={imgSrc} alt={foodName + '사진'} />
        {headingPosition !== 'topLeft' ? (
          <figcaption className={classNames(styles['title'], styles[headingPosition])}>{foodName}</figcaption>
        ) : (
          ''
        )}
        <span className={styles[summary]} dangerouslySetInnerHTML={{ __html: summaryText }} />
      </figure>
    </div>
  );
}

Card.propTypes = {
  type: PropTypes.oneOf(['wide', 'square']),
  background: PropTypes.oneOf(['white', 'none']),
  summary: PropTypes.bool,
  headingPosition: PropTypes.oneOf(['bottomLeft', 'bottomCenter', 'topLeft']),
  imgSrc: PropTypes.string,
  foodName: PropTypes.string,
  summaryText: PropTypes.string,
};
