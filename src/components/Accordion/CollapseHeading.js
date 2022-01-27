import React from 'react';
import PropTypes from 'prop-types';
import { GoChevronDown } from 'react-icons/go';
import styles from './Accordion.module.scss';

const CollapseHeading = ({ heading }) => {
  return (
    <div className={styles.collapseHeading}>
      <h3 className={styles.heading}>{heading}</h3>
      <GoChevronDown />
    </div>
  );
};

export default CollapseHeading;

CollapseHeading.propTypes = {
  heading: PropTypes.oneOf(['ingredients', 'equipment', 'summary', 'instructions']).isRequired,
};
