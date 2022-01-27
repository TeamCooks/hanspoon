import React from 'react';
import PropTypes from 'prop-types';
import CollapseHeading from './CollapseHeading';
import CollapseContent from './CollapseContent';
import styles from './Accordion.module.scss';

const Collapse = ({ type, content }) => {
  let collapseContentContainer = null;
  const collapseContentComponent = <CollapseContent type={type} content={content} />;

  switch (type) {
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
          <CollapseHeading heading={type} />
        </summary>
        {collapseContentContainer}
      </details>
    </li>
  );
};

export default Collapse;

Collapse.propTypes = {
  type: PropTypes.oneOf(['ingredients', 'equipment', 'summary', 'instructions']).isRequired,
};
