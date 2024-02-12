import React from 'react';

type ScanButtonProps = {
  text: string
};

export default function ScanButton(props:ScanButtonProps):React.JSX.Element {
    return (
          <button className='scanButton'>{props.text}</button>
      )
}