import React from 'react';
import FilterDropdown from './FilterDropdown';
import FilterDropdownNative from './FilterDropdownNative';

type RowHeaderProps = {
  api: string,
  status: string,
  location: string,
  stable: string,
  notes: string,
  filters: string[],
  filter: (status: string)=> void
}

export default function RowHeader(props:RowHeaderProps):React.JSX.Element {

  return (
      <div className='rowHeader'>
        <div className='headerName-api'>{props.api}</div>
        <div className='headerName'>{props.location}</div>
        <div className='headerName-status'>
          <div>{props.status}</div>
          <div className="filter-dropdown">
            < FilterDropdownNative filters={props.filters} filter={props.filter}/>
          </div>
        </div>
        <div className='headerName-stable'>{props.stable}</div>
        <div className='headerName-notes'>{props.notes}</div>
      </div>
    )
}