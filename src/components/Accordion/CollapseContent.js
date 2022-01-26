import React from 'react';
import styles from './Accordion.module.scss';

const CollapseContent = ({ type, content }) => {
  switch (type) {
    case 'ingredients':
      return content.map((ingredient, index) => (
        <li key={index} className={styles.ingredient}>
          <span>{ingredient.name}</span>
          <span>{`${ingredient.amount.toFixed(2)} ${ingredient.unit}`}</span>
        </li>
      ));
    case 'equipment':
      return content.map((equipment, index) => <li key={index}>{equipment}</li>);
    case 'summary':
      return <span>{content}</span>;
    case 'instructions':
      return content.map((instructions, index) => <li key={index}>{instructions}</li>);
    default:
      return null;
  }
};

export default CollapseContent;
