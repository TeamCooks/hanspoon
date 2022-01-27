import React from 'react';
import styles from './Accordion.module.scss';

const CollapseContent = ({ type, content }) => {
  switch (type) {
    case 'ingredients':
      return content.map((ingredient, index) => (
        <li key={'ingredient' + index} className={styles.ingredient}>
          <span>{ingredient.name}</span>
          <span>{`${ingredient.amount.toFixed(2)} ${ingredient.unit}`}</span>
        </li>
      ));
    case 'equipment':
      return content.map((equipment, index) => <li key={'equipment' + index}>{equipment}</li>);
    case 'summary':
      return content.split('. ').map((text, index, texts) => (
        <p key={'summary' + index} className={styles.accordionText}>
          {text + (index < texts.length - 1 ? '.' : '')}
        </p>
      ));
    case 'instructions':
      return content.map((instructions, index) => (
        <li key={'instructions' + index}>
          <p className={styles.accordionText}>{instructions}</p>
        </li>
      ));
    default:
      return null;
  }
};

export default CollapseContent;
