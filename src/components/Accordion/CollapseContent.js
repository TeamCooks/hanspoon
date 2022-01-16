import React from 'react';

const CollapseContent = (props) => {
  const recipeContentItems = props.content.filter((item) => item).map((item, index) => <li key={index}>{item}</li>);
  return <ol>{recipeContentItems}</ol>;
};

export default CollapseContent;
