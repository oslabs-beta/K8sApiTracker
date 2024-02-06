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
        <div className='headerName-api'>{props.api}</div>
        <div className='headerName'>{props.location}</div>
        <div className='headerName-status'>{props.status}</div>
        <div className='headerName-stable'>{props.stable}</div>
        <div className='headerName-notes'>{props.notes}</div>
      </div>
    )
}