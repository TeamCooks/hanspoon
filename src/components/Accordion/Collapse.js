import React from 'react';
import CollapseHeading from './CollapseHeading';
import CollapseContent from './CollapseContent';

const Collapse = (props) => {
  return (
    <div>
      <CollapseHeading heading={props.heading} />
      <CollapseContent content={props.content} />
    </div>
  );
};

export default Collapse;
