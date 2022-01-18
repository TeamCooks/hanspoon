import React from 'react';
import PropTypes from 'prop-types';
import styles from './Label.module.scss';

import { BsBookmarkHeartFill } from 'react-icons/bs';
import { RiTimerFill } from 'react-icons/ri';

export function Label({ type, text }) {
  const iconStyle = {
    marginRight: '20px',
    fontSize: '26px',
    verticalAlign: 'bottom',
  };

  const renderByType = (type) => {
    switch (type) {
      case 'time':
        return (
          <span className={styles.label}>
            {<RiTimerFill style={iconStyle} />}Ready in <span className={styles.bold}>{text} minutes</span>
          </span>
        );
      case 'bookmark':
        return (
          <span className={styles.label}>
            {<BsBookmarkHeartFill style={iconStyle} />}
            <span className={styles.bold}>{text}</span> saved
          </span>
        );
      default:
        return null;
    }
  };
  return <div>{renderByType(type)}</div>;
}

Label.propTypes = {
  type: PropTypes.oneOf(['time', 'bookmark']).isRequired,
  text: PropTypes.string.isRequired,
};
