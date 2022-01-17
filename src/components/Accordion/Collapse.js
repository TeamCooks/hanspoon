import React from 'react';
import CollapseHeading from './CollapseHeading';
import CollapseContent from './CollapseContent';
import styles from './Collapse.module.scss';

const Collapse = (props) => {
  return (
    <div className={`${styles.recipeInfoItem}`}>
      <CollapseHeading heading={props.heading} />
      <CollapseContent content={props.content} />
    </div>
  );
};

export default Collapse;
