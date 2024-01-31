import React from 'react';

type ColumnProps = {
  api: string,
  location: string,
  status: string,
  backgroundColor: string
}

export default function Column(props:ColumnProps):React.JSX.Element {
  
  return (
      <div className="row" color={props.backgroundColor}>
        <div className="api-info">{props.api}</div>
        <div className="api-info">{props.location}</div>
        <div className="api-info">{props.status}</div>
      </div>
    )
}