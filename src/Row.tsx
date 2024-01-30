import React from 'react';

type ColumnProps = {
  api: string,
  location: string,
  status: string,
}

export default function Column(props:ColumnProps):React.JSX.Element {
  
  return (
      <div className="row">
        <div>{props.api}</div>
        <div>{props.location}</div>
        <div>{props.status}</div>
      </div>
    )
}