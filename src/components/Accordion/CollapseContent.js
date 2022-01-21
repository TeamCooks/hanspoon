import React from 'react';
import styles from './Accordion.module.scss';

const CollapseContent = (props) => {
  const recipeContentItems = props.content.filter((item) => item).map((item, index) => <li key={index}>{item}</li>);
  return <ol className={styles.collapseContent}>{recipeContentItems}</ol>;
};

export default CollapseContent;
