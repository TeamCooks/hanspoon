import React from 'react';
import styles from './Accordion.module.scss';

const CollapseContent = ({ type, content }) => {
  switch (type) {
    case 'ingredients':
      return content.map((ingredient, index) => (
        <li key={index} className={styles.collapseContentItem}>
          <span>{ingredient.name}</span>
          <span>{ingredient.amount}</span>
          <span>{ingredient.unit}</span>
        </li>
      ));
    case 'equipment':
      return content.map((equipment, index) => (
        <li key={index} className={styles.collapseContentItem}>
          {equipment}
        </li>
      ));
    case 'summary':
      return <span className={styles.collapseContentItem}>{content}</span>;
    case 'instructions':
      return content.map((instructions, index) => (
        <li key={index} className={styles.collapseContentItem}>
          {instructions}
        </li>
      ));
    default:
      return null;
  }
};

export default CollapseContent;
