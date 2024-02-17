import React, {useState} from 'react';
import { VscTriangleDown } from "react-icons/vsc";
import { VscTriangleUp } from "react-icons/vsc";
import { FilterDropdownProps } from "./types"

export default function FilterDropdownNative(props: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function toggleDropdown(){
    setIsOpen(!isOpen)
  }
  return (
    <div className='filter-Container'>
      <button onClick={toggleDropdown} className="filter-button">
        {isOpen ? <VscTriangleUp />: <VscTriangleDown />}
      </button>

      
        <ul className='filter-dropdown' style={{visibility: `${isOpen ? 'visible' : 'hidden'}`}}>
            <li className='filter-dropdown-item'>
            <label className="filter-label">
                <input
                  type="checkbox"
                  checked={props.filters.includes('stable')}
                  onChange={()=>props.filter('stable')}
                  className ="filter-checkbox"
                />
                stable
              </label>
            </li>

            <li className='filter-dropdown-item'>
            <label className="filter-label">
                <input
                  type="checkbox"
                  checked={props.filters.includes('updateAvailable')}
                  onChange={()=>props.filter('updateAvailable')}
                  className ="filter-checkbox"
                />
                updateAvailable
              </label>
            </li>

            <li className='filter-dropdown-item'>
            <label className="filter-label">
                <input
                  type="checkbox"
                  checked={props.filters.includes('removed')}
                  onChange={()=>props.filter('removed')}
                  className ="filter-checkbox"
                />
                removed
              </label>
            </li>
        </ul>
      
    </div>
  );
}