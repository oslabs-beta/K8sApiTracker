import React from 'react';

type ScanButtonProps = {
  text: string,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  isLoading: boolean
};

export default function ScanButton(props:ScanButtonProps):React.JSX.Element {
    return (
          <button className='scanButton' onClick={props.onClick} disabled={props.isLoading}>{props.text}</button>
    )
}