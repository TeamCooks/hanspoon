import React from 'react';
import CollapseHeading from './CollapseHeading';
import CollapseContent from './CollapseContent';
import styles from './Accordion.module.scss';

const Collapse = (props) => {
  return (
    <li className={`${styles.recipeInfoItem}`}>
      <CollapseHeading heading={props.heading} />
      <CollapseContent content={props.content} />
    </li>
  );
};

export default Collapse;
