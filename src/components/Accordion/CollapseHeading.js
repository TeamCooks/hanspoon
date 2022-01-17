import React from 'react';
import styles from './CollapseHeading.module.scss';

const CollapseHeading = (props) => {
  return <h3 className={`${styles.heading}`}>{props.heading}</h3>;
};

export default CollapseHeading;
