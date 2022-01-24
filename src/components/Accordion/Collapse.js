import React from 'react';
import CollapseHeading from './CollapseHeading';
import CollapseContent from './CollapseContent';
import styles from './Accordion.module.scss';

const Collapse = (props) => {
  let collapseContent = null;
  switch (props.heading) {
    case 'ingredients':
      collapseContent = (
        <ul className={styles.collapseContent}>
          <CollapseContent type={props.heading} content={props.content} />
        </ul>
      );
      break;
    case 'equipment':
      collapseContent = (
        <ul className={styles.collapseContent}>
          <CollapseContent type={props.heading} content={props.content} />
        </ul>
      );
      break;
    case 'summary':
      collapseContent = (
        <p className={styles.collapseContent}>
          <CollapseContent type={props.heading} content={props.content} />
        </p>
      );
      break;
    case 'instructions':
      collapseContent = (
        <ol className={styles.collapseContent} type="1">
          <CollapseContent type={props.heading} content={props.content} />
        </ol>
      );
      break;
    default:
      break;
  }

  return (
    <li className={styles.recipeInfoItem}>
      <details>
        <summary>
          <CollapseHeading heading={props.heading} />
        </summary>
        {collapseContent}
      </details>
    </li>
  );
};

export default Collapse;
