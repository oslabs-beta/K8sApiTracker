import Column from './Column';
import React from 'react';

export default function MainContainer():React.JSX.Element {
    const columnNames: string[] = ['API', 'Status', 'Location'];
    const columns: React.JSX.Element[] = [];
    for(let i = 0; i < columnNames.length; i++) {
        columns.push(<Column columnNames={columnNames[i]}/>);
    }

    return (
      <>
        {columns}
      </>
    )
}