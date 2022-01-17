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
  headingSize,
  padding,
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
            className={classNames(styles['cardWrap'], styles[background], { [styles.inlineBlock]: type === 'square' })}
          >
            <img className={styles[type]} src={imgSrc} alt={title + 'picture'} />
            <figcaption className={classNames(styles['title'], styles[headingPosition])}>{title}</figcaption>
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
          className={styles.memberDialog}
        >
          <h2 className={styles.heading}>이곳이 바로 상세페이지입니다</h2>
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
