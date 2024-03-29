import React from 'react';
import { ScanButtonProps } from './types'

export default function ScanButton(props: ScanButtonProps): React.JSX.Element {
  return (
    <button className='scanButton' id={`scanButton${props.id}`} onClick={props.onClick} disabled={props.isLoading}>{props.text}</button>
  )
}