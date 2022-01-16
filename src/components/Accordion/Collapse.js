import React from 'react';

const Collapse = (props) => {
  return (
    <div>
      <h3>{props.heading}</h3>
      <p>{props.content}</p>
    </div>
  );
};

export default Collapse;
