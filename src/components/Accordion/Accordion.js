import React from 'react';
import Collapse from './Collapse';
import styles from './Accordion.module.scss';

const Accordion = ({ recipeDetails }) => {
  const recipiInfoItems = recipeDetails.map((recipeInfo) => (
    <Collapse key={recipeInfo.type} type={recipeInfo.type} content={recipeInfo.data} />
  ));

  return <ul className={styles.Accordion}>{recipiInfoItems}</ul>;
};

export default Accordion;
