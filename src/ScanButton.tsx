import React from 'react';

type ScanButtonProps = {
  id: number,
  text: string,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  isLoading: boolean
};

export default function ScanButton(props: ScanButtonProps): React.JSX.Element {
  return (
    <button className='scanButton' id={`scanButton${props.id}`} onClick={props.onClick} disabled={props.isLoading}>{props.text}</button>
  )
}