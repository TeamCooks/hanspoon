import React from 'react';
import CollapseHeading from './CollapseHeading';
import CollapseContent from './CollapseContent';
import styles from './Accordion.module.scss';

const Collapse = ({ heading, content }) => {
  let collapseContentContainer = null;
  const collapseContentComponent = <CollapseContent type={heading} content={content} />;

  switch (heading) {
    case 'ingredients':
      collapseContentContainer = <ul className={styles.collapseContent}>{collapseContentComponent}</ul>;
      break;
    case 'equipment':
      collapseContentContainer =
        !content || !content.length ? (
          <p>No Equipment.</p>
        ) : (
          <ul className={styles.collapseContent}>{collapseContentComponent}</ul>
        );
      break;
    case 'summary':
      collapseContentContainer = <div className={styles.collapseContent}>{collapseContentComponent}</div>;
      break;
    case 'instructions':
      collapseContentContainer =
        !content || !content.length ? (
          <p>No Instructions.</p>
        ) : (
          <ol className={styles.collapseContent}>{collapseContentComponent}</ol>
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
        {collapseContentContainer}
      </details>
    </li>
  );
};

export default Collapse;
