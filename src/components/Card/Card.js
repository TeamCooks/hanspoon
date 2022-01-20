import PropTypes from 'prop-types';
import styles from './Card.module.scss';
import classNames from 'classnames';
import { excludeTags } from '@utils/misc';
import { useState } from 'react';
import { Dialog, Detail } from '..';
export function Card({
  id = 0,
  type,
  background,
  hasSummary,
  headingPosition,
  imgSrc = 'http://placehold.it/312x230',
  title,
  summary = '',
}) {
  const [isVisible, setIsVisible] = useState(false);

  const handleOpenDialog = (e) => {
    e.preventDefault();
    setIsVisible(true);
  };

  const handleCloseDialog = () => {
    setIsVisible(false);
  };
  return (
    <>
      <button
        className={styles.cardButton}
        type="button"
        onClick={handleOpenDialog}
        aria-label={`Open dialog of ${title}`}
        aria-haspopup="dialog"
      >
        <div className={classNames(styles.cardWrap, styles[background], { [styles.inlineBlock]: type === 'square' })}>
          <figure>
            <img className={styles[type]} src={imgSrc} alt={title} />
            <figcaption className={classNames(styles.title, styles[headingPosition])}>{title}</figcaption>
          </figure>
          {hasSummary && <p className={styles.summary}>{excludeTags(summary)}</p>}
        </div>
      </button>
      {isVisible ? (
        <Dialog
          isVisible={isVisible}
          onClose={handleCloseDialog}
          nodeId="dialog"
          img={imgSrc}
          label={title}
          className={styles.detailDialog}
        >
          <Detail id={id} imgSrc={imgSrc} title={title} />
        </Dialog>
      ) : null}
    </>
  );
}

Card.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf(['wide', 'square', 'smallSquare']),
  background: PropTypes.oneOf(['white', 'none']),
  hasSummary: PropTypes.bool,
  headingPosition: PropTypes.oneOf(['bottomLeft', 'bottomCenter', 'topLeft']),
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  summary: PropTypes.string,
};
