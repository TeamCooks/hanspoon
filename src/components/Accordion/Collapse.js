import React from 'react';
import CollapseHeading from './CollapseHeading';
import CollapseContent from './CollapseContent';
import styles from './Accordion.module.scss';

const Collapse = (props) => {
  return (
    <li className={`${styles.recipeInfoItem}`}>
      <details>
        <summary>
          <CollapseHeading heading={props.heading} />
        </summary>
        <CollapseContent content={props.content} />
      </details>
    </li>
  );
};

export default Collapse;
