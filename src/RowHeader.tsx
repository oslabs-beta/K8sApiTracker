import React from 'react';
import FilterDropdown from './FilterDropdown'
import { RowHeaderProps } from './types'

export default function RowHeader(props:RowHeaderProps):React.JSX.Element {
  return (
      <div className='rowHeader'>
        <div className='headerName-api'>{props.api}</div>
        <div className='headerName'>{props.location}</div>
        <div className='headerName-status'>
          {props.status}
          < FilterDropdown filters={props.filters} filter={props.filter}/>
        </div>
        <div className='headerName-stable'>{props.stable}</div>
        <div className='headerName-notes'>{props.notes}</div>
      </div>
    )
}