import React from 'react';
import InputLabel from '@mui/material/InputLabel';
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
    <div>
      <FormControl sx={{ m: 1, width: '10vw' }}>
        <InputLabel id="demo-multiple-checkbox-label">Filter</InputLabel>
        <Select
          // use multiple to allow the select dropdown to check multiple options at once
          multiple
          // value stores the text in the box 
          value={props.filters} 
        >
          <MenuItem>
            <Checkbox checked={props.filters.includes('stable')} onChange={()=>props.filter('stable')}/>
            <ListItemText primary="stable" />
          </MenuItem>
          <MenuItem>
            <Checkbox checked={props.filters.includes('updateAvailable')} onChange={()=>props.filter('updateAvailable')}/>
            <ListItemText primary="updateAvailable" />
          </MenuItem>
          <MenuItem>
            <Checkbox checked={props.filters.includes('removed')} onChange={()=>props.filter('removed')}/>
            <ListItemText primary="removed" />
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}