import React from 'react';


type RowProps = {
  api: string,
  location: string,
  status: string,
  stable: string,
  notes: string
}

export default function Row(props:RowProps):React.JSX.Element {
  
  return (
      <div className='row'>
        <div className="api-info-api">{props.api}</div>
        <div className="api-info-location">{props.location}</div>
        <div className="api-info-status-wrapper">
          <div className={"api-info-status-" + props.status}>{props.status}</div>
        </div>
        <div className="api-info-stable-version">{props.stable}</div>
        <div className={"api-info-notes"}>{props.notes}</div>
      </div>
    )
}