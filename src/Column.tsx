import React from 'react';

type ColumnProps = {
  columnNames: string
}


export default function Column(props:ColumnProps):React.JSX.Element {
  
  return (
      <div>
        <h1>{props.columnNames}</h1>
      </div>
    )
}