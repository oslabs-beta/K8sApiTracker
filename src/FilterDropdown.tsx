import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

//more info here: https://mui.com/material-ui/react-select/#multiple-select

export default function FilterDropdown() {
  const [statuses, setStatuses] = useState<string[]>([]);

  function updateStatuses(status: string){
    //if status has the string, remove it
    if(statuses.includes(status)){
      const newStatuses: string[] = [...statuses]
      newStatuses.splice(newStatuses.indexOf(status),1);
      setStatuses(newStatuses);
    }
    //otherwise, add it
    else{
      const newStatuses: string[] = [...statuses]
      newStatuses.push(status);
      setStatuses(newStatuses);
    }
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: '10vw' }}>
        <InputLabel id="demo-multiple-checkbox-label">Filter</InputLabel>
        <Select
          // use multiple to allow the select dropdown to check multiple options at once
          multiple
          // value stores the text in the box 
          value={statuses} 
        >
          <MenuItem>
            <Checkbox checked={statuses.includes('stable')} onChange={()=>updateStatuses('stable')}/>
            <ListItemText primary="stable" />
          </MenuItem>
          <MenuItem>
            <Checkbox checked={statuses.includes('updateAvailable')} onChange={()=>updateStatuses('updateAvailable')}/>
            <ListItemText primary="updateAvailable" />
          </MenuItem>
          <MenuItem>
            <Checkbox checked={statuses.includes('deprecated')} onChange={()=>updateStatuses('deprecated')}/>
            <ListItemText primary="deprecated" />
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}