import React from 'react';
import styles from './Accordion.module.scss';
import { sentenceIntoParagraph } from '@utils';

const CollapseContent = ({ type, content }) => {
  switch (type) {
    case 'ingredients':
      return content.map((ingredient, index) => (
        <li key={ingredient.name + index} className={styles.ingredient}>
          <span>{ingredient.name}</span>
          <span>{`${ingredient.amount.toFixed(2)} ${ingredient.unit}`}</span>
        </li>
      ));
    case 'equipment':
      return content.map((equipment, index) => <li key={equipment + index}>{equipment}</li>);
    case 'summary':
      return sentenceIntoParagraph(content, styles.accordionText);
    case 'instructions':
      return content.map((instruction, index) => (
        <li key={instruction + index}>
          <p className={styles.accordionText}>{instruction}</p>
        </li>
      ));
    default:
      return null;
  }
};

export default CollapseContent;
