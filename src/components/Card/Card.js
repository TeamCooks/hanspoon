import PropTypes from 'prop-types';
import styles from './Card.module.scss';
import classNames from 'classnames';
import { excludeTags } from '@utils/misc';
import { useState } from 'react';
import { Dialog, Detail } from '..';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import imgUrl from '@assets/images/no-image.jpg';

export function Card({ id = 0, type, background, hasSummary, headingPosition, imgSrc = imgUrl, title, summary = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleOpenDialog = (e) => {
    setIsVisible(true);
  };

  const handleCloseDialog = () => {
    navigate(-1);
    setIsVisible(false);
  };

  return (
    <>
      <Link
        to={`${location.pathname}?id=${id}`}
        role="button"
        className={styles.cardButton}
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
      </Link>
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
