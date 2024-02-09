import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

//more info here: https://mui.com/material-ui/react-select/#multiple-select

type FilterDropdown = {
  filters: string[],
  filter: (status: string)=> void
}

export default function FilterDropdown(props: FilterDropdown) {
  return (
    <FormControl className="filter-dropdown2">
      <Select
        // use multiple to allow the select dropdown to check multiple options at once
        multiple
        // value stores the text in the box 
        value={props.filters} 
        className="filter-dropdown3"
      >
        <div className="filter-dropdown-item">
          <MenuItem className="menu-item" >
            <Checkbox className="checkbox" checked={props.filters.includes('stable')} onChange={()=>props.filter('stable')}/>
            <ListItemText primary="stable" />
          </MenuItem>
          <MenuItem>
            <Checkbox className="checkbox" checked={props.filters.includes('updateAvailable')} onChange={()=>props.filter('updateAvailable')}/>
            <ListItemText primary="updateAvailable" />
          </MenuItem>
          <MenuItem>
            <Checkbox className="checkbox" checked={props.filters.includes('removed')} onChange={()=>props.filter('removed')}/>
            <ListItemText primary="removed" />
          </MenuItem>
        </div>

      </Select>
    </FormControl>
  );
}