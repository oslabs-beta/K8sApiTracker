import React from 'react';

type ColumnProps = {
  api: string,
  location: string,
  status: string,
}

export default function Column(props:ColumnProps):React.JSX.Element {
  
  return (
      <div className="row">
        <div className="api-info" >{props.api}</div>
        <div className="api-info">{props.location}</div>
        <div className="api-info">{props.status}</div>
      </div>
    )
}