import React, {useState} from 'react';
import { VscTriangleDown } from "react-icons/vsc";
import { VscTriangleUp } from "react-icons/vsc";

type FilterDropdown = {
  filters: string[],
  filter: (status: string)=> void
}

export default function FilterDropdownNative(props: FilterDropdown) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function toggleDropdown(){
        setIsOpen(!isOpen)
    }

    let triangle = isOpen ? <VscTriangleDown /> : <VscTriangleUp />;

  return (
    <div>
      <button onClick={toggleDropdown} className="filter-button">
        {triangle}
      </button>

      {isOpen && (
        <ul className='filter-dropdown'>
            <li className='filter-dropdown-item'>
            <label className="filter-label">
                <input
                  type="checkbox"
                  checked={props.filters.includes('stable')}
                  onChange={()=>props.filter('stable')}
                  className ="filter-checkbox"
                />
                removed
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
                removed
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
      )}
    </div>
  );
}