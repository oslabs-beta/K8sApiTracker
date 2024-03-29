import React from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { SiIfixit } from "react-icons/si";
import { RowProps } from './types'

export default function Row(props:RowProps):React.JSX.Element {
  // render the icon depending on the status of the api
  let icon: React.ReactElement;
  if(props.status === 'stable'){
    icon = <FaCheckCircle className="icon-stable"/>;
  } else if (props.status === 'updateAvailable'){
    icon = <IoIosWarning className="icon-deprecated"/>
  } else{
    icon = <SiIfixit className="icon-removed"/>
  }

  return (
      <div className='row'>
        <div className="api-info-api">{props.api}</div>
        <div className="api-info-location">{props.location}</div>
        <div className="api-info-status-wrapper">
          <div className={"api-info-status-" + props.status}>
            {icon}    
            {props.status}
          </div>
        </div>
        <div className="api-info-stable-version">{props.stable}</div>
        <div className={"api-info-notes" + (props.notes === 'NA' ? '-has-notes': '' )}>{props.notes}</div>
      </div>
    )
}