import React from 'react';

type RowHeaderProps = {
  api: string,
  status: string,
  location: string,
  stable: string,
  notes: string
}

export default function RowHeader(props:RowHeaderProps):React.JSX.Element {

  return (
      <div className='rowHeader'>
        <div className='headerName'>{props.api}</div>
        <div className='headerName'>{props.location}</div>
        <div className='headerName'>{props.status}</div>
        <div className='headerName'>{props.stable}</div>
        <div className='headerName'>{props.notes}</div>
      </div>
    )
}