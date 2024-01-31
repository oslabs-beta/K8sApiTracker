import React from 'react';

type HeaderProps = {
  api: string,
  status: string,
  location: string
}

export default function RowHeader(props:HeaderProps):React.JSX.Element {

  return (
      <div className='row'>
        <div className='headerName'>{props.api}</div>
        <div className='headerName'>{props.location}</div>
        <div className='headerName'>{props.status}</div>
      </div>
    )
}