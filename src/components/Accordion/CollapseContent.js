import React from 'react';
import styles from './Accordion.module.scss';

const CollapseContent = ({ type, content }) => {
  switch (type) {
    case 'ingredients':
      return content.map((ingredient, index) => (
        <li key={index} className={styles.collapseContent}>
          <span>{ingredient.name}</span>
          <span>{ingredient.amount}</span>
          <span>{ingredient.unit}</span>
        </li>
      ));
    case 'equipment':
      return content.map((equipment, index) => (
        <li key={index} className={styles.collapseContent}>
          {equipment}
        </li>
      ));
    case 'summary':
      return <span className={styles.collapseContent}>{content}</span>;
    case 'instructions':
      return content.map((instructions, index) => (
        <li key={index} className={styles.collapseContent}>
          {instructions}
        </li>
      ));
    default:
      return null;
  }
};

export default CollapseContent;
