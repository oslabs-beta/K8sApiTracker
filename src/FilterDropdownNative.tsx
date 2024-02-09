import React, {useState} from 'react';

type FilterDropdown = {
  filters: string[],
  filter: (status: string)=> void
}

export default function FilterDropdownNative(props: FilterDropdown) {
    const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div>
      <button style={{ marginBottom: '10px' }}>Toggle Dropdown</button>
      {isOpen && (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>
            <label>
                <input
                  type="checkbox"
                  checked={props.filters.includes('removed')}
                />
              </label>
            </li>
        </ul>
      )}
    </div>
  );
}