import React from 'react';
import { GoChevronDown } from 'react-icons/go';
import styles from './Accordion.module.scss';

const CollapseHeading = (props) => {
  return (
    <div className={styles.collapseHeading}>
      <h3 className={styles.heading}>{props.heading}</h3>
      <GoChevronDown />
    </div>
  );
};

export default CollapseHeading;
