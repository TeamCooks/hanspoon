import PropTypes from 'prop-types';
import styles from './Card.module.scss';
import classNames from 'classnames';
import { excludeTags } from '@utils/misc';
import { useState } from 'react';
import { Dialog } from '..';
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
      <a href="#" role="button" onClick={handleOpenDialog}>
        <div className={classNames({ [styles.inlineBlock]: type === 'square' })}>
          <figure
            className={classNames(styles.cardWrap, styles[background], { [styles.inlineBlock]: type === 'square' })}
          >
            <img className={styles[type]} src={imgSrc} alt={title} />
            <figcaption className={classNames(styles.title, styles[headingPosition])}>{title}</figcaption>
            <span className={styles[hasSummary]}>{excludeTags(summary)}</span>
          </figure>
        </div>
      </a>
      {isVisible ? (
        <Dialog
          isVisible={isVisible}
          onClose={handleCloseDialog}
          nodeId="dialog"
          img={imgSrc}
          label={title}
          className={styles.detailDialog}
        >
          <h2 className={styles.heading}>{id+'번 레시피에 대한 상세 내용이 여기 들어갑니다.'}</h2>
        </Dialog>
      ) : null}
    </>
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
