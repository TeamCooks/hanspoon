import React from 'react';
import Collapse from './Collapse';
import styles from './Accordion.module.scss';

const Accordion = ({ recipeDetails }) => {
  console.log(recipeDetails);
  const recipiInfoItems = recipeDetails.map((recipeInfo, index) => (
    <Collapse key={index} heading={recipeInfo.type} content={recipeInfo.data} />
  ));

  return <ul className={styles.accordion}>{recipiInfoItems}</ul>;
};

export default Accordion;
