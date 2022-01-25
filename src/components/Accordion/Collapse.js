import React from 'react';
import CollapseHeading from './CollapseHeading';
import CollapseContent from './CollapseContent';
import styles from './Accordion.module.scss';

const Collapse = ({ heading, content }) => {
  let collapseContent = null;
  switch (heading) {
    case 'ingredients':
      collapseContent = (
        <ul className={styles.collapseContent}>
          <CollapseContent type={heading} content={content} />
        </ul>
      );
      break;
    case 'equipment':
      collapseContent =
        !content || !content.length ? (
          <p>No Equipment.</p>
        ) : (
          <ul className={styles.collapseContent}>
            <CollapseContent type={heading} content={content} />
          </ul>
        );
      break;
    case 'summary':
      collapseContent = (
        <p className={styles.collapseContent}>
          <CollapseContent type={heading} content={content} />
        </p>
      );
      break;
    case 'instructions':
      collapseContent =
        !content || !content.length ? (
          <p>No Instructions.</p>
        ) : (
          <ol className={styles.collapseContent} type="1">
            <CollapseContent type={heading} content={content} />
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
          <CollapseHeading heading={heading} />
        </summary>
        {collapseContent}
      </details>
    </li>
  );
};

export default Collapse;
